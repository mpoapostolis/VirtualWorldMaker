import { Node, useStore } from '@/store'
import { TransformControls, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { BoxHelper, Euler } from 'three'
import { Gltf } from '../gltf'
import { Light } from '../lights'
import { NodeType } from '../menu'
import { MeshGeometry } from '../meshGeometry'

export const lights: any[] = ['AmbientLight', 'DirectionalLight', 'HemisphereLight', 'PointLight', 'SpotLight']

export function Node(
  props: Partial<Node> & {
    selected: boolean
  },
) {
  const store = useStore()
  const ref = useRef(null)
  useHelper(props.selected && ref.current && ref, BoxHelper, 'yellow')
  // rotation degrees to rad
  const rotation = props.rotation
    ? new Euler(
        (props.rotation.x * Math.PI) / 180,
        (props.rotation.y * Math.PI) / 180,
        (props.rotation.z * Math.PI) / 180,
      )
    : new Euler(0, 0, 0)
  return (
    <TransformControls
      mode={store.mode}
      position={props.position ?? [0, 0, 0]}
      rotation={rotation}
      scale={props.scale ?? [0, 0, 0]}
      onMouseUp={(e) => {
        const obj = e?.target.object
        if (obj && props.uuid) {
          store.updateNode(props.uuid, {
            position: obj.position,
            rotation: obj.rotation,
            scale: obj.scale,
          })
        }
      }}
      enabled={props.selected}
      showX={props.selected}
      showY={props.selected}
      showZ={props.selected}>
      <>
        {lights.includes(props.type) ? (
          <Light type={props.type as NodeType} />
        ) : (
          <mesh
            castShadow
            receiveShadow
            ref={ref}
            onClick={() => {
              props.uuid && store.selectNode(props.uuid)
            }}>
            {props.object && props.uuid && props.type === 'GLTF' && (
              <Gltf animation={props.animation} uuid={props.uuid} url={props.object} />
            )}
            {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
            <meshStandardMaterial color={'red'} />
          </mesh>
        )}
      </>
    </TransformControls>
  )
}
