import Information from '../models/InformationModel.js';

// Add data
export const addInformation = async (req, res) => {
    const { whatsapp, email, alamat } = req.body;
    try {
        const newInformation = new Information({ whatsapp, email, alamat });
        const savedInformation = await newInformation.save();
        res.status(201).json(savedInformation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update data
export const updateInformation = async (req, res) => {
    const { id } = req.params;
    const { whatsapp, email, alamat } = req.body;
    try {
        const updatedInformation = await Information.findByIdAndUpdate(
            id,
            { whatsapp, email, alamat },
            { new: true, runValidators: true }
        );
        if (!updatedInformation) {
            return res.status(404).json({ message: 'Information not found' });
        }
        res.status(200).json(updatedInformation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read data
export const getInformation = async (req, res) => {
    try {
        const information = await Information.find();
        res.status(200).json(information);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single information by id
export const getInformationById = async (req, res) => {
    const { id } = req.params;
    try {
        const information = await Information.findById(id);
        if (!information) {
            return res.status(404).json({ message: 'Information not found' });
        }
        res.status(200).json(information);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
