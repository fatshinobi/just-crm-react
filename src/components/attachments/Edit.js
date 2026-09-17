import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiGet, apiPatch } from '../../api/apiFetch'

function AttachmentEdit() {
    const { id } = useParams();
    const { attachment_id } = useParams();
    const [attachment, setAttachment] = useState({ description: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!attachment_id) return;
        apiGet(`${process.env.REACT_APP_API_HOST}/customers/attachments/${id}/${attachment_id}`)
        .then(data => {
          console.log('Attachment data:', data);
          setAttachment(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [attachment_id]);

    const fieldValidate = (record, value) => {
        if ((record === "description") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Name must be present" }));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length !== 0) {
            return;
        }

        const formData = new FormData();
        if (attachment.description !== null) formData.append('description', attachment.description);

        apiPatch(`${process.env.REACT_APP_API_HOST}/customers/attachments/${id}/${attachment_id}`, formData)
        .then(data => {
            console.log('Attachment updated:', data);
            navigate(`company/details/${id}`);
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
                    <label className="block text-gray-700 mb-1">Description:</label>
                    <input type="text" name="description" value={attachment?.description || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {formErrors["description"] && <p style={{ color: "red" }}>{formErrors["description"]}</p>}
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
            </form>
        </div>
    );
}

export default AttachmentEdit;
