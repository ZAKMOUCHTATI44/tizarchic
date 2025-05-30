import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const data = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nos délais de livraison varient entre 3 et 5 jours ouvrables.",
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous pouvez retourner un produit sous 14 jours après réception.",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires, PayPal et le paiement à la livraison.",
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Vous recevrez un email avec un lien de suivi dès que votre commande est expédiée.",
    },
  ];
  return (
    <div className="container mx-auto my-24 px-4 max-w-4xl">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-2xl lg:text-4xl font-serif font-medium text-gray-800 text-center mb-6">
          <span className="text-main">Questions</span> Fréquemment Posées
        </h2>
        <div className="w-20 h-1 bg-main mb-6" />
        <p className="text-gray-600 text-center max-w-xl leading-relaxed">
          Vous avez une question? Nous sommes là pour vous aider
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {data.map((item) => (
          <AccordionItem 
            key={item.question} 
            value={item.question}
            className="border-b border-gray-200 last:border-b-0"
          >
            <AccordionTrigger className="py-6 hover:bg-gray-50 px-4 transition-colors text-left">
              <span className="font-serif text-lg text-gray-800 hover:text-main">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 px-4 text-gray-600 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;