import React, {useState, useEffect} from 'react'

export default function TestFetch() {
    const [statuses, setStatuses] = useState ([]);

    const token = '9e686309-5b27-4a05-a345-ab3978e261e5';
    
    useEffect(() => {
        fetch ('https://momentum.redberryinternship.ge/api/priorities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(results => {
                console.log(results)
        })
    }, [])

    
  return (
    <div>Fetch results</div>
  )
}
