
import { useEffect, useRef } from "react";
import type { Route } from "./+types";

const ContactPage = ({}: Route.ComponentProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const resetForm = () => {
      formRef.current?.reset();
    };

    // Clear fields on first render.
    resetForm();

    // Also clear fields when returning via browser history cache.
    window.addEventListener("pageshow", resetForm);
    return () => window.removeEventListener("pageshow", resetForm);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
        <h2 className='text-3xl font-bold text-white mb-8 text-center'>
           📬 Contact Me
        </h2>

        <form 
          ref={formRef}
          action='https://formspree.io/f/meeekpdk'
          method='post'
          className="space-y-6"
          autoComplete="off"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input 
              type="text" 
              id='name' 
              name="name" 
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email" 
              id='email' 
              name="email" 
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
            <input 
              type="text" 
              id='subject' 
              name="subject" 
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
            <textarea 
              id='message' 
              name="message" 
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            />
          </div>

          <button className="w-full text-white py-2 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Send Message
          </button>
        </form>
    </div>
  )
}

export default ContactPage