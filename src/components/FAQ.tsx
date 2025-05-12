import React from 'react';
import { HelpCircle, Check, Shield, Zap, ChevronDown, CreditCard } from 'lucide-react';

interface FAQItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ title, icon, children, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <span className="text-blue-600 mr-4">{icon}</span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-8 pb-6 text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      title: "What is Comment Assistant?",
      icon: <HelpCircle className="w-6 h-6" />,
      content: (
        <>
          <p className="mb-4">
            Comment Assistant is a Chrome Extension that lets you generate 1-click AI replies for Twitter (X) and LinkedIn.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              Select the post you want to reply to
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              Choose your preferred emotion-based reply
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              Get an AI-generated response instantly
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              Edit if needed, or keep it as is
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              Post your comment and engage!
            </li>
          </ul>
        </>
      )
    },
    {
      title: "Do you offer a free plan?",
      icon: <Check className="w-6 h-6" />,
      content: (
        <>
          <span className="font-semibold text-blue-600">Yes!</span>
          <br />
          We provide 5 free AI-generated replies powered by GPT-4 for you to try and experience Comment Assistant with no commitment!
        </>
      )
    },
    {
      title: "Will my account be blocked if I use Comment Assistant?",
      icon: <Shield className="w-6 h-6" />,
      content: (
        <>
          <span className="font-semibold text-blue-600">No!</span>
          <br />
          Since all actions are done by you, it's no different from copy-pasting a comment manually. No risk of account blockage!
        </>
      )
    },
    {
      title: "How is Comment Assistant different from other AI commenting tools?",
      icon: <Zap className="w-6 h-6" />,
      content: (
        <p>
          We're confident that our AI-generated comments are 99% better than other commenting tools on the market, offering more engaging, high-quality responses that stand out.
        </p>
      )
    },
    {
      title: "How can I test the payment?",
      icon: <CreditCard className="w-6 h-6" />,
      content: (
        <>
          For testing, use card number: 4242424242424242
          <br />
          Expiry: Any future date
          <br />
          CVV: Any 3 digits
        </>
      )
    }
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Questions
          </span>
        </h2>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              title={item.title}
              icon={item.icon}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            >
              {item.content}
            </FAQItem>
          ))}
        </div>
      </div>
    </div>
  );
}