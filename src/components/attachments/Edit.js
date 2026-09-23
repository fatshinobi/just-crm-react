import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { apiGet, apiPatch, apiDelete } from '../../api/apiFetch'

function AttachmentEdit() {
    const { id } = useParams();
    const { attachment_id } = useParams();
    const [attachment, setAttachment] = useState({ description: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const editUrl = () => {
        switch (true) {
            case location.pathname.includes("/company/attachments/edit"):
                return `${process.env.REACT_APP_API_HOST}/customers/attachments/${id}/${attachment_id}`;
            case location.pathname.includes("/person/attachments/edit"):
                return `${process.env.REACT_APP_API_HOST}/clients/attachments/${id}/${attachment_id}`;
            case location.pathname.includes("/opportunity/attachments/edit"):
                return `${process.env.REACT_APP_API_HOST}/opportunities/attachments/${id}/${attachment_id}`;
        }
    };

    const navigationPath = () => {
        switch (true) {
            case location.pathname.includes("/company/attachments/edit"):
                return `company/details/${id}`;
            case location.pathname.includes("/person/attachments/edit"):
                return `person/details/${id}`;
            case location.pathname.includes("/opportunity/attachments/edit"):
                return `opportunity/details/${id}`;
        }
    };

    useEffect(() => {
        if (!attachment_id) return;
        apiGet(editUrl())
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

        apiPatch(editUrl(), formData)
        .then(data => {
            console.log('Attachment updated:', data);
            navigate(navigationPath());
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (!window.confirm("Delete? This action cannot be undone.")) return;
            apiDelete(editUrl())
            .catch((error) => {
                console.error('Delete error:', error);
            })
            .finally(() => {
                navigate(navigationPath());
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Edit Attachment</h1>
            <div>
                <label className="block text-gray-700 mb-1">File:</label>
                {attachment?.uploaded_file_url ? (
                    <a href="#" onClick={()=>window.open(`${process.env.REACT_APP_API_HOST}${attachment.uploaded_file_url}`, "_blank")} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {attachment?.uploaded_file_name || "No file available"}
                    </a>
                ) : (
                    <span className="text-gray-500">No file available</span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Description:</label>
                    <input type="text" name="description" value={attachment?.description || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {formErrors["description"] && <p style={{ color: "red" }}>{formErrors["description"]}</p>}
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded ml-4"
                    aria-label="Delete"
                >Delete</button>

                <Link to={navigationPath()} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default AttachmentEdit;
