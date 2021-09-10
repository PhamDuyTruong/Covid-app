import React,{useEffect, useState} from 'react'
import { getCountries, getReportByCountries } from './Apis';
import '@fontsource/roboto';
import { sortBy } from 'lodash';
import { Container, Typography } from '@material-ui/core';
import CountrySelector from './Components/CountrySelector';
import Highlight from './Components/Highlight';
import Summary from './Components/Summary';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(()=>{
    getCountries().then((res) =>{
        const countries = sortBy(res.data, 'Country')
        setCountries(countries);
       setSelectedCountryId("vn")

    });
  }, []);

  const handleOnChange=(e) =>{
    e.preventDefault();
    setSelectedCountryId(e.target.value);
  }

  useEffect(() =>{
    if(selectedCountryId){
    const {Slug} = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId);
    getReportByCountries(Slug).then((res) =>{
        res.data.pop();
        setReport(res.data);
    })
  }
  }, [countries, selectedCountryId]);


  return (
    <Container style={{ marginTop: 20 }}>
        <Typography variant='h2' component='h2'>
           Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
        <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId}/>
        <Highlight report={report}/>
        <Summary selectedCountryId={selectedCountryId} report={report}/>
    </Container>
  );
}

export default App;
