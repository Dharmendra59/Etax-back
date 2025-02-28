import FileData from "../../models/FileModel.js";

// query form submit
 const fileSubmit = async (req,res)=>{
    const {name,mobile,email,message,file} = req.body ;

    try{
        if(!name || !mobile || !email || !file || !message) return res.status(404).json({message:'Please fill all fields'}) ;

        const query = new FileData({name,mobile,email,file,message});
        await query.save();

        return res.status(200).json({message:'Query Submitted Succesfully'})
    }
    catch(err){
        console.log('Error at contact',err); 
        return res.status(500).json({error:err});
    }
}


// get query form 
 const fileGet = async (req,res)=>{

    try{
    
        const query = await FileData.find();

        if(!query) return res.status(400).json({message:'No Query Found'});
        return res.status(200).json({message:'Query fetched Succesfully',query});
    }
    catch(err){
        console.log('Error at contact',err);
        return res.status(500).json({error:err});
    }
}

export {fileSubmit,fileGet}