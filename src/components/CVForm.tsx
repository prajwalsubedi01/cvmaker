import { ChangeEvent } from "react";
import  CVData from "@/types/CVData";

interface CVFormProps {
  data: CVData;
  onChange: (field: keyof CVData, value: string) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange, onImageUpload }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name as keyof CVData, value);
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Personal Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              onChange={onImageUpload}
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
            Contact Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone*
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Professional Summary
        </h3>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="Briefly describe your professional background and key qualifications..."
          rows={4}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Education
        </h3>
        <textarea
          name="education"
          value={data.education}
          onChange={handleChange}
          placeholder="Include your degrees, institutions, and dates attended..."
          rows={4}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Work Experience
        </h3>
        <textarea
          name="experience"
          value={data.experience}
          onChange={handleChange}
          placeholder="List your work history with company names, positions, and key achievements..."
          rows={4}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Skills
        </h3>
        <input
          type="text"
          name="skills"
          value={data.skills}
          onChange={handleChange}
          placeholder="List your skills separated by commas (e.g., JavaScript, React, Project Management)"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Projects */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Projects
        </h3>
        <textarea
          name="projects"
          value={data.projects}
          onChange={handleChange}
          placeholder="Describe any significant projects you've worked on..."
          rows={4}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">
          Certifications
        </h3>
        <textarea
          name="certifications"
          value={data.certifications}
          onChange={handleChange}
          placeholder="List any professional certifications you've earned..."
          rows={4}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </form>
  );
};

export default CVForm;