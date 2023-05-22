'use client'

export const VXLverseVersion = 'VXLverse_v0.6.0'

import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Mesh } from 'three'
import { Scene, Store, useStore } from '.'

export const getUuid = () => {
  const mesh = new Mesh()
  const uuid = mesh.uuid
  mesh?.remove()
  return uuid
}
export const defaultNodes = [
  {
    uuid: getUuid(),
    name: 'DirectionalLight',
    position: [-40, 20, 40],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    scene: 'main',
    type: 'DirectionalLight',
  },
  {
    uuid: getUuid(),
    name: 'DirectionalLight',
    position: [40, 20, -40],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    scene: 'main',
    type: 'DirectionalLight',
  },
] as any[]

export const defaultScenes: Scene[] = [
  {
    uuid: 'main',
    name: 'Main',
    type: 'color',
    color: '#000',
  },
]

export const defaultGameConf: Partial<Store> = {
  selectedNode: undefined,
  nodes: defaultNodes,
  scenes: defaultScenes,
  currentScene: defaultScenes?.at(0)?.uuid,
  quests: [],
}

export const lights = ['AmbientLight', 'DirectionalLight', 'HemisphereLight', 'PointLight', 'SpotLight']

export const geometries = [
  'Box',
  'Capsule',
  'Circle',
  'Cylinder',
  'Dodecahedron',
  'Icosahedron',
  'Lathe',
  'Octahedron',
  'Plane',
  'Ring',
  'Sphere',
  'Sprite',
  'Tetrahedron',
  'Torus',
  'TorusKnot',
  'Tube',
]

export function exportGame() {
  const state = useStore.getState() ?? []
  const nodes = state.nodes ?? []
  const scenes = state.scenes.map((scene) => ({
    ...scene,
  }))

  const zip = new JSZip()
  zip.file(
    'gameConf.json',
    JSON.stringify({
      nodes: nodes.map((e) => {
        const { actions, ...rest } = e
        return rest
      }),
      scenes,
      quests: state.quests,
    }),
  )

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'VXLverse.zip')
  })
}

// // take file from input type
export async function importGameZip(file: File) {
  const zip = await JSZip.loadAsync(file)
  const _gameConf = await zip.file('gameConf.json')?.async('string')
  const gameConfJson = JSON.parse(_gameConf ?? '{}')

  useStore?.setState({
    nodes: gameConfJson?.nodes ?? [],
    scenes: gameConfJson?.scenes ?? [],
    quests: gameConfJson?.quests ?? [],
    selectedNode: undefined,
    currentScene: gameConfJson?.scenes?.at(0)?.uuid,
  })
}

export function getLocalStorage() {
  if (typeof window === 'undefined') return
  return window.localStorage
}

export type CharStatus = 'walk' | 'run' | 'attack' | 'jump' | 'die' | 'idle' | 'hit' | 'interact'

export const CharStatuss: {
  label: string
  value: CharStatus
}[] = [
  { label: 'Walk', value: 'walk' },
  { label: 'Run', value: 'run' },
  { label: 'Attack', value: 'attack' },
  { label: 'Jump', value: 'jump' },
  { label: 'Die', value: 'die' },
  { label: 'Idle', value: 'idle' },
  { label: 'Hit', value: 'hit' },
  { label: 'Interact', value: 'interact' },
]

// sleep
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
