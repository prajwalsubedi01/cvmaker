import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVData from "@/types/CVData";

interface CVTemplateProps {
  data: CVData;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data}) => {
  const cvRef = useRef<HTMLDivElement>(null);

 const handleDownloadPDF = async () => {
  if (!cvRef.current) return;

  // Create a clone of the CV content
  const input = cvRef.current;
  const clone = input.cloneNode(true) as HTMLElement;
  
  // Style the clone for PDF export
  clone.style.width = '210mm';
  clone.style.padding = '20px';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.backgroundColor = 'white';
  
  // Hide elements that shouldn't appear in PDF
  const downloadButton = clone.querySelector('button');
  if (downloadButton) downloadButton.style.display = 'none';

  // Replace unsupported color functions in the clone
  const replaceUnsupportedColors = (element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    
    // Check and replace oklch() colors
    if (style.color.includes('oklch')) {
      element.style.color = '#000000'; // fallback to black
    }
    if (style.backgroundColor.includes('oklch')) {
      element.style.backgroundColor = '#ffffff'; // fallback to white
    }
    if (style.borderColor.includes('oklch')) {
      element.style.borderColor = '#dddddd'; // fallback to light gray
    }
    
    // Process all children
    Array.from(element.children).forEach(child => {
      replaceUnsupportedColors(child as HTMLElement);
    });
  };

  // Append clone to body (temporarily)
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  document.body.appendChild(clone);

  // Replace unsupported colors in the cloned element
  replaceUnsupportedColors(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
      backgroundColor: '#ffffff', // force white background
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`${data.name || 'cv'}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback solution - try with simpler settings
    try {
      const canvas = await html2canvas(clone, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.name || 'cv'}-fallback.pdf`);
    } catch (fallbackError) {
      console.error('Fallback PDF generation failed:', fallbackError);
      alert('Failed to generate PDF. Please try again or contact support.');
    }
  } finally {
    // Remove the clone
    document.body.removeChild(clone);
  }
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {data.name || "Your Name"}
                </h2>
                <p className="text-lg text-blue-600 flex items-center">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg> */}
                  {data.title || "Professional Title"}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {data.email && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {data.email}
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {data.phone}
                    </div>
                  )}
                  {data.address && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {data.address}
                    </div>
                  )}
                  {data.linkedin && (
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      {data.linkedin}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Professional Summary
                  </h3>
                </div>
                <div className="pl-8">
                  <p className="text-gray-700 whitespace-pre-line">{data.summary}</p>
                </div>
              </section>
            )}

            {/* Education */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Education
                </h3>
              </div>
              <div className="pl-8 space-y-4">
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
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Work Experience
                </h3>
              </div>
              <div className="pl-8 space-y-6">
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
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Skills
                </h3>
              </div>
              <div className="pl-8">
                <div className="flex flex-wrap gap-2">
                  {data.skills ? (
                    data.skills.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Your skills here...</p>
                  )}
                </div>
              </div>
            </section>

            {/* Additional Sections */}
            {data.projects && (
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Projects
                  </h3>
                </div>
                <div className="pl-8">
                  <div className="pl-4 border-l-4 border-blue-200">
                    <p className="text-gray-700 whitespace-pre-line">{data.projects}</p>
                  </div>
                </div>
              </section>
            )}

            {data.certifications && (
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Certifications
                  </h3>
                </div>
                <div className="pl-8">
                  <div className="pl-4 border-l-4 border-blue-200">
                    <p className="text-gray-700 whitespace-pre-line">{data.certifications}</p>
                  </div>
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