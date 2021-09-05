import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'

export default function Audio({songList}) {
  const [isPause, setIsPause] = useState(false)
  
  return (
    <Box>
      <audio>
        <source src={}/>
      </audio>
    </Box>
  )
}
