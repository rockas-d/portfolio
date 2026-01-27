"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uNoiseStrength;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vNormal = normal;
    vPosition = position;
    
    float noise1 = snoise(position * 0.8 + uTime * 0.2);
    float noise2 = snoise(position * 1.5 + uTime * 0.4) * 0.5;
    float noise3 = snoise(position * 3.0 + uTime * 0.15) * 0.25;
    float noise = noise1 + noise2 + noise3;
    
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec2 mouseDir = uMouse - worldPos.xy;
    float mouseDist = length(mouseDir);
    float mouseInfluence = smoothstep(3.0, 0.0, mouseDist) * uMouseStrength;
    
    vec3 mouseDisplacement = normal * mouseInfluence * sin(uTime * 3.0 + mouseDist * 2.0);
    
    vec3 newPosition = position + normal * noise * uNoiseStrength + mouseDisplacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  uniform vec3 uBlobPosition;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDir = normalize(-vPosition);
    
    vec3 lightDir1 = normalize(vec3(0.5, 0.8, 1.0));
    vec3 lightDir2 = normalize(vec3(-0.5, -0.3, 0.8));
    vec3 lightDir3 = normalize(vec3(0.0, 1.0, 0.5));
    
    float diffuse1 = max(dot(vNormal, lightDir1), 0.0);
    float diffuse2 = max(dot(vNormal, lightDir2), 0.0) * 0.5;
    float diffuse3 = max(dot(vNormal, lightDir3), 0.0) * 0.3;
    float diffuse = diffuse1 + diffuse2 + diffuse3;
    
    vec3 halfDir = normalize(lightDir1 + viewDir);
    float specular = pow(max(dot(vNormal, halfDir), 0.0), 32.0) * 0.5;
    
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
    
    float rim = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 4.0);
    
    float depth = (vPosition.z + 3.0) / 6.0;
    float depthShading = mix(0.3, 1.0, depth);
    
    vec3 worldPos = vPosition + uBlobPosition;
    vec2 mouseDir = uMouse - worldPos.xy;
    float mouseDist = length(mouseDir);
    float mouseInfluence = smoothstep(2.5, 0.0, mouseDist);
    
    float ripple = sin(mouseDist * 4.0 - uTime * 5.0) * 0.5 + 0.5;
    float colorSplash = mouseInfluence * ripple;
    
    vec3 baseColor = vec3(1.0) * depthShading;
    vec3 darkColor = vec3(0.15);
    vec3 limeColor = vec3(0.83, 1.0, 0.0);
    
    vec3 color = mix(darkColor, baseColor, diffuse * 0.7 + 0.3);
    color += specular * vec3(1.0);
    color += rim * vec3(0.3);
    color = mix(color, limeColor, colorSplash);
    
    float alpha = 0.15 + diffuse * 0.2 + fresnel * 0.15 + specular * 0.1 + colorSplash * 0.3;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseStrength: { value: 0.5 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 1.2 },
      uBlobPosition: { value: new THREE.Vector3(3.5, 0, 0) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(cameraRef.current!);
      vector.sub(cameraRef.current!.position).normalize();
      const distance = -cameraRef.current!.position.z / vector.z;
      const pos = cameraRef.current!.position.clone().add(vector.multiplyScalar(distance));
      
      targetMouseRef.current.x = pos.x;
      targetMouseRef.current.y = pos.y;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  useFrame((state) => {
    cameraRef.current = state.camera;
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;
      
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
  });
  
  return (
    <mesh ref={meshRef} position={[3.5, 0, 0]}>
      <icosahedronGeometry args={[2.6, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function Blob() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <MorphingBlob />
      </Canvas>
    </div>
  );
}
