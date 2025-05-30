import FileData from "../../models/FileModel.js";

// Query Form Submit
const fileSubmit = async (req, res) => {
    const { name, mobile, email, message } = req.body;
    const file = req.file?.path || req.file?.url || req.file?.secure_url;

    console.log("📤 Received Data:", { name, mobile, email, file, message });
    console.dir(req.file, { depth: null });

    try {
        if (!name || !mobile || !email || !file || !message) {
            console.warn('❗ Validation Failed', { name, mobile, email, file, message });
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const query = new FileData({ name, mobile, email, file, message });
        await query.save();

        return res.status(200).json({ message: 'Query Submitted Successfully' });
    } catch (err) {
        console.error('🔥 Error at fileSubmit:', JSON.stringify(err, null, 2));
        return res.status(500).json({ error: err?.message || JSON.stringify(err) || 'Internal Server Error' });
    }
};

// Get Query Form Data
const fileGet = async (req, res) => {
    try {
        const queries = await FileData.find();

        if (queries.length === 0) {
            return res.status(404).json({ message: 'No Query Found' });
        }

        return res.status(200).json({ message: 'Query fetched Successfully', queries });
    } catch (err) {
        console.log('Error at fileGet:', err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

export { fileSubmit, fileGet };
