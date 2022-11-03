import { useState, ChangeEvent, FormEvent } from 'react';
import { 
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	Stack, 
	StackDivider,
	Text,
	useColorModeValue as mode 
} from '@chakra-ui/react';
import { StatCard } from './components/StateCard';
import { getStockPrice } from './utils/api';

import './App.css';

// Type declaration
type Stock = {
	symbol: string;
    curPrice: number;
    margin: number;
    percentChange: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    prevPrice: number;
    time: string;
}

const defaultStock: Stock = {
	symbol: '',
	curPrice: 0,
    margin: 0,
    percentChange: 0,
    highPrice: 0,
    lowPrice: 0,
    openPrice: 0,
    prevPrice: 0,
    time: ''
}

const defaultFormFields = {
  	symbol: ''
}

const App = () => {
	const [stock, setStock] = useState<Stock>(defaultStock);
	const [formFields, setFormFields ] = useState(defaultFormFields);
	const { symbol } = formFields;

	const resetFormFields = () => {
		return (
			setFormFields(defaultFormFields)
		);
	}

	// hanlde input changes
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({...formFields, [name]: value});
		console.log("symbol: ", symbol);
	}

	// handle form submit
	const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("symbol: ", symbol);

		try {
			// make the API call
			const res: Stock = await getStockPrice(symbol.toUpperCase());
			setStock(res);
			resetFormFields();
		} catch (error) {
			alert('Something went wrong');
		}
	}

	return(
		<Box as="section" py="12" bg={mode('gray.100', 'inherit')} style={{height: '100vh'}}>
			<Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
				<Heading as="h2" size="xl" lineHeight="1" letterSpacing="tight" style={{textAlign: 'center', textTransform: 'uppercase'}}>
					stock’s latest quote price
				</Heading>
				<Box
					mx="auto"
					py="6"
					px="8"
					rounded={{ md: 'lg' }}
					bg={mode('white', 'gray.700')}
					shadow="base"
					mt="20"
				>
					<Box mb="5">
						<Text as="h3" fontWeight="bold" fontSize="lg">
							Stock Price Tracker
						</Text>
					</Box>
		
					<form
						onSubmit={handleSubmit}
					>
						<Stack direction={{ base: 'column', md: 'row' }} spacing="2">
							<FormControl id="symbol">
								<InputGroup>
									<FormLabel srOnly>Enter symbol</FormLabel>
									<Input bg={mode('white', 'gray.800')} name="symbol" onChange={handleChange} value={symbol} placeholder="Enter a symbol here" />
								</InputGroup>
							</FormControl>
							<Button type="submit" colorScheme="blue" minW="24">
								Get Quote
							</Button>
						</Stack>
					</form>
				</Box>

				<Box bg={mode('white', 'gray.700')} p="10" mt="10" rounded="xl" shadow="base">
					{
						stock.symbol && 
						<Heading as="h2" size="xl" lineHeight="1" letterSpacing="tight" mb={10} style={{textAlign: 'center', textTransform: 'uppercase'}}>
							Symbol - {stock.symbol}
						</Heading>
					}
					<Stack
						spacing="8"
						justify="space-between"
						direction={{ base: 'column', md: 'row' }}
						divider={<StackDivider />}
					>
						<StatCard
							data={{ label: 'Current Price', price: stock.curPrice, }}
						/>
						<StatCard
							data={{ label: 'Previous Price', price: stock.prevPrice }}
						/>
						<StatCard
							data={{ label: 'Margin', change: stock.margin, changePercent: stock.percentChange }}
						/>
						<StatCard
							data={{ label: 'Current Time', time: stock.time }}
						/>
					</Stack>
				</Box>
			</Box>
		</Box>
	)
}

export default App;