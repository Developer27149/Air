import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import React from 'react'

export default function ImageView({full, raw}) {
  return (
    <Box>
      <Image src={full}/>
    </Box>
  )
}
