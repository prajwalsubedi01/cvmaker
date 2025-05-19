import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVData from "@/types/CVData";

interface CVTemplateProps {
  data: CVData;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data, onImageUpload }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!cvRef.current) return;

    const input = cvRef.current;
    const scale = 2; // Increase for higher quality

    html2canvas(input, {
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.name || 'cv'}.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">CV Builder</h1>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>

        <div ref={cvRef} className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* CV Content */}
          <div className="p-8">
            {/* Header with Image */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              {data.image ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                  <img 
                    src={data.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-blue-100 flex items-center justify-center text-gray-500">
                  <span>Upload Photo</span>
                </div>
              )}
              
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {data.name || "Your Name"}
                </h2>
                <p className="text-lg text-gray-600 mb-1">
                  {data.title || "Professional Title"}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                  {data.email && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {data.email}
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {data.phone}
                    </div>
                  )}
                  {data.address && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {data.address}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Upload (only visible in edit mode) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              <input
                type="file"
                onChange={onImageUpload}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {/* Summary */}
            {data.summary && (
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">
                  Professional Summary
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{data.summary}</p>
              </section>
            )}

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {data.education ? (
                  <div className="pl-4 border-l-4 border-blue-200">
                    <p className="text-gray-700 whitespace-pre-line">{data.education}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Your education details...</p>
                )}
              </div>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">
                Work Experience
              </h3>
              <div className="space-y-6">
                {data.experience ? (
                  <div className="pl-4 border-l-4 border-blue-200">
                    <p className="text-gray-700 whitespace-pre-line">{data.experience}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Your experience details...</p>
                )}
              </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills ? (
                  data.skills.split(',').map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Your skills here...</p>
                )}
              </div>
            </section>

            {/* Additional Sections */}
            {data.projects && (
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">
                  Projects
                </h3>
                <div className="pl-4 border-l-4 border-blue-200">
                  <p className="text-gray-700 whitespace-pre-line">{data.projects}</p>
                </div>
              </section>
            )}

            {data.certifications && (
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-100 pb-2 mb-4">
                  Certifications
                </h3>
                <div className="pl-4 border-l-4 border-blue-200">
                  <p className="text-gray-700 whitespace-pre-line">{data.certifications}</p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVTemplate;