'use client'
import useCountries from '@/app/hooks/useCountry';
import Select from 'react-select'

export type CountrySelectValue = {
   flag:string;
   label:string;
   latlng:number[];
   value:string;
}

interface CountrySelectProps{
   value?:CountrySelectValue;
   onChange:(value:CountrySelectValue)=>void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({
   value,
   onChange
}) => {

   const {getAll}=useCountries();


   return (
      <div>
         <Select
            placeholder='Anywhere'
            isClearable
            options={getAll()}
            value={value}
            onChange={(value)=>onChange(value as CountrySelectValue)}
            formatOptionLabel={(option:any)=>(
               <div className='flex flex-row items-center gap-3'>
                  <div>{option.flag}</div>
                  <div>
                     {option.label}, 
                     <span className='text-neutral-500 ml-1'>
                        {option.region}
                     </span>
                  </div>
               </div>
            )}
            classNames={{
               control:()=>'p-3 border-1',
               input:()=>'text-md',
               option:()=>'text-md'
            }}
            theme={(theme)=>({
               ...theme,
               borderRadius:12,
               colors:{
                  ...theme.colors,
                  primary:'black',
                  primary25:'#ffe4e6'
               }
            })}
         />
      </div>
   )
}

export default CountrySelect