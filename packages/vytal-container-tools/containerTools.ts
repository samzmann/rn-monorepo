import { ContainerTypeId } from './types'

export const containerData = {
  [ContainerTypeId.CtrDefault]: {
    containerType: ContainerTypeId.CtrDefault,
    name: 'Container',
    imageSource: require('./assets/Container-0-Default.png'),
  },
  [ContainerTypeId.Ctr1250mlBowl]: {
    containerType: ContainerTypeId.Ctr1250mlBowl,
    name: '1250ml Bowl',
    imageSource: require('./assets/Container-1-Bowl-1250.webp'),
  },
}

export const getContainerName = (containerType: ContainerTypeId) => {
  if (containerData[containerType] && containerData[containerType]?.name) {
    return containerData[containerType].name
  }

  // return default container name as fallback
  return containerData[ContainerTypeId.CtrDefault].name
}

export const getContainerImageSource = (containerType: ContainerTypeId, urlFallback?: string) => {
  if (containerData[containerType]
    && containerData[containerType]?.imageSource
    && containerType !== ContainerTypeId.CtrDefault
  ) {
    return containerData[containerType].imageSource
  }

  if (urlFallback) return { uri: urlFallback }

  // return default container image as fallback
  return containerData[ContainerTypeId.CtrDefault].imageSource
}
