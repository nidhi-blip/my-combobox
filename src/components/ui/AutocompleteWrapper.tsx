import { useEffect, useState } from "react"
import axios from "axios"
import { Autocomplete } from "."

import { Country } from "../../ts/interfaces/Country.interface"



const AutocompleteWrapper = () => {
	const [data, setData] = useState<Country[]>([])

	useEffect(() => {
		axios.get(`https://restcountries.com/v3.1/lang/eng`).then(resp => setData(resp.data))
	}, [])

	return (
		<div>
			<h1 className="text">
						English-speaking countries:
			</h1>

			
			<div className= 'autocompleteContainer'>
					<Autocomplete data={data} />
			</div>				
			
		</div>
	)
}

export default AutocompleteWrapper
