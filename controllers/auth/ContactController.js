import Contact from "../../models/contactModel.js";

// query form submit
 const querySubmit = async (req,res)=>{
    const {name,mobile,email,message} = req.body ;

    try{
        if(!name || !mobile || !email || !message) return res.status(404).json({message:'Please fill all fields'}) ;

        const query = new Contact({name,mobile,email,message});
        await query.save();

        return res.status(200).json({message:'Query Submitted Succesfully'})
    }
    catch(err){
        console.log('Error at contact',err);
        return res.status(500).json({error:err});
    }
}


// get query form 
 const queryGet = async (req,res)=>{

    try{
    
        const query = await Contact.find();

        if(!query) return res.status(400).json({message:'No Query Found'});
        return res.status(200).json({message:'Query fetched Succesfully',query});
    }
    catch(err){
        console.log('Error at contact',err);
        return res.status(500).json({error:err});
    }
}

export {querySubmit,queryGet}