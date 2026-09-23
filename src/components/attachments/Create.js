import { useState } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { apiPost } from '../../api/apiFetch'

function AttachmentCreate() {
    const [attachment, setAttachment] = useState({ description: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [formErrors, setFormErrors] = useState({
        "description": "Name must be present",
        "uploaded_file": "File must be present"
    });
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const createUrl = () => {
        switch (true) {
            case location.pathname.includes("/company/attachments/create"):
                return `${process.env.REACT_APP_API_HOST}/customers/attachments/${id}`;
            case location.pathname.includes("/person/attachments/create"):
                return `${process.env.REACT_APP_API_HOST}/clients/attachments/${id}`;
            case location.pathname.includes("/opportunity/attachments/create"):
                return `${process.env.REACT_APP_API_HOST}/opportunities/attachments/${id}`;
        }
    };

    const navigationPath = () => {
        switch (true) {
            case location.pathname.includes("/company/attachments/create"):
                return `company/details/${id}`;
            case location.pathname.includes("/person/attachments/create"):
                return `person/details/${id}`;
            case location.pathname.includes("/opportunity/attachments/create"):
                return `opportunity/details/${id}`;
        }
    };

    const fieldValidate = (record, value) => {
        if ((record === "description") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Name must be present" }));
        } else if ((record === "uploaded_file") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "File must be present" }));
        } else {
            setFormErrors(prev => {
                const { [record]: _, ...rest } = prev;
                return rest;
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttachment(prev => ({ ...prev, [name]: value }));
        fieldValidate(name, value);
    };

    const handleSelect = (e) => {
        setSelectedFile(e.target.files[0]);
        fieldValidate("uploaded_file", "true");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length !== 0) {
            return;
        }
        const formData = new FormData();
        if (attachment.description !== null) formData.append('description', attachment.description);
        if (selectedFile) {
            formData.append('uploaded_file', selectedFile);
        }

        apiPost(createUrl(), formData)
        .then(data => {
            console.log('Attachment created:', data);
            navigate(navigationPath());
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Company Create</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">File:</label>
                    <input type="file" name="uploaded_file" onChange={(e) => handleSelect(e)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {formErrors["uploaded_file"] && <p style={{ color: "red" }}>{formErrors["uploaded_file"]}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Description:</label>
                    <input type="text" name="description" value={attachment?.description || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {formErrors["description"] && <p style={{ color: "red" }}>{formErrors["description"]}</p>}
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={navigationPath()} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default AttachmentCreate;
