"use client";

import { useState, useCallback } from "react";
import CVForm from "@/components/CVForm";
import CVTemplate from "@/components/CVTemplate";
import CVData from "@/types/CVData";

export default function Home() {
  const [cvData, setCvData] = useState<CVData>({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    certifications: "",
  });

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCvData(prev => ({
            ...prev,
            image: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleInputChange = useCallback((field: keyof CVData, value: string) => {
    setCvData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Professional CV Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">CV Details</h2>
            </div>
            <CVForm 
              data={cvData}
              onChange={handleInputChange}
              onImageUpload={handleImageUpload}
            />
          </div>

          {/* Preview Section */}
          <div className="sticky top-4 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Live Preview</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <CVTemplate 
                  data={cvData} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}