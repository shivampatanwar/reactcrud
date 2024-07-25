import React from 'react'

const Update = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        state: ""
    });



    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = await axios.post("/create", formData)
        .then(()=> form.reset())
        // console.log(data);
        

    }

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    return (

        <form onSubmit={handleOnSubmit} >

            <input type="text" placeholder='Name' required name="name" onChange={handleOnChange} />

            <input type="email" placeholder='Email' required name="email" onChange={handleOnChange} />

            <input type="tel" placeholder='Mobile' required name="mobile" onChange={handleOnChange} />

            <input type="text" placeholder='City' required name="city" onChange={handleOnChange} />

            <input type="text" placeholder='State' required name="state" onChange={handleOnChange} />

            <button type='submit'>Submit</button>

        </form>


    )
}

export default Update
