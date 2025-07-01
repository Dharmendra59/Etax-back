import FileData from "../../models/FileModel.js";

// Query Form Submit
const fileSubmit = async (req, res) => {
    const { name, mobile, email, message } = req.body;
    
    try {
        if (!name || !mobile || !email || !req.file || !message) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const fileData = {
            url: req.file.path,
            public_id: req.file.filename,
            originalName: req.file.originalname
        };

        const query = new FileData({ 
            name, 
            mobile, 
            email, 
            file: fileData, 
            message 
        });
        
        await query.save();

        return res.status(200).json({ 
            message: 'Query Submitted Successfully',
            query
        });
    } catch (err) {
        console.error('Error at fileSubmit:', err);
        return res.status(500).json({ 
            error: err?.message || 'Internal Server Error' 
        });
    }
};

// Get Query Form Data
const fileGet = async (req, res) => {
    try {
        const queries = await FileData.find().sort({ createdAt: -1 });

        if (queries.length === 0) {
            return res.status(404).json({ message: 'No Query Found' });
        }

        return res.status(200).json({ 
            message: 'Query fetched Successfully', 
            queries 
        });
    } catch (err) {
        console.log('Error at fileGet:', err);
        return res.status(500).json({ 
            error: err.message || 'Internal Server Error' 
        });
    }
};

// Delete a file entry
const fileDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await FileData.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ message: 'File not found' });
        }
        
        return res.status(200).json({ 
            message: 'File deleted successfully' 
        });
    } catch (err) {
        console.log('Error at fileDelete:', err);
        return res.status(500).json({ 
            error: err.message || 'Internal Server Error' 
        });
    }
};

export { fileSubmit, fileGet, fileDelete };