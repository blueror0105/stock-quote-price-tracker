import {
    Box,
    Heading,
    HStack,
    Stack,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { Indicator } from './Indicator'
  
interface StatProps {
    data: {
        change?: number
        label: string
        time?: string
        price?: number
        changePercent?: number
    }
}

export const StatCard = (props: StatProps) => {
    const { label, time, price, changePercent, change } = props.data
  
    const isNegative = change ? change < 0 : false;
    let changeText = changePercent ? `${changePercent}%` : undefined;
  
    return (
        <Stack mx="auto" spacing="3">
            <Box color={mode('gray.600', 'gray.400')} fontWeight="medium">
                {label}
            </Box>
            {
                price && 
                <HStack>
                    <Heading as="h6" size="lg" lineHeight="1" letterSpacing="tight">
                        $ {price}
                    </Heading>
                </HStack>
            }
            {
                change &&
                <HStack>
                    <Heading as="h6" size="lg" lineHeight="1" letterSpacing="tight">
                        $ {change}
                    </Heading>
                    {
                        changeText &&
                        <Indicator type={isNegative ? 'down' : 'up'} value={changeText} />
                    }
                </HStack>
            }
            {
                time &&
                <Heading as="h6" size="lg" lineHeight="1" letterSpacing="tight">
                    {time}
                </Heading>
            }
        </Stack>
    )
  }