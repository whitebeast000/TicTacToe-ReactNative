import React from 'react'
import type { PropsWithChildren } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'



type IconsProps =  PropsWithChildren <{
  name : string;
}>


const Icons = ({name} : IconsProps ) =>
{
  switch(name)
  {
    case 'circle':
      return <Icon name='circle-thin' size={38} color='orange'/>
      
  
    case 'cross':
      return <Icon name='times' size={38} color='skyblue'/>
      
    default:
      return <Icon name='pencil' size={38} color='yellow'/>

  }

}

export default Icons