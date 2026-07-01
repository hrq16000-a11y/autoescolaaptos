import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MessageCircle, Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { whatsappLink } from "@/lib/whatsapp";
import { toast } from "sonner";
import { z } from "zod";

/**
 * ContactForm — a partir da diretriz de "sem exposição de email", o formulário
 * NÃO envia mais mensagens por e-mail. Ele monta uma mensagem estruturada com
 * os dados preenchidos e abre o WhatsApp de triagem (funil).
 */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  phone: z.string().trim().min(10, "Telefone/WhatsApp inválido").max(20, "Telefone muito longo"),
  message: z.string().trim().min(5, "Conte um pouco mais sobre o que precisa").max(1000, "Mensagem muito longa"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { trackConversion, trackWhatsAppClick } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    const msg = [
      "Olá! Vim pelo site da Autoescola APTOS.",
      `Nome: ${formData.name}`,
      `Telefone/WhatsApp: ${formData.phone}`,
      `Mensagem: ${formData.message}`,
    ].join("\n");

    trackConversion("whatsapp_lead", "contact_form", "contact_form_whatsapp", 50);
    trackWhatsAppClick("contact_form");

    toast.success("Abrindo o WhatsApp para finalizar sua mensagem…");
    window.open(whatsappLink(msg, "funil"), "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-2xl font-heading font-bold mb-2 text-center">
        Envie sua Mensagem pelo WhatsApp
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Preencha os campos e continue a conversa direto no WhatsApp da APTOS.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-destructive" : ""}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone/WhatsApp *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(41) 99999-9999"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "border-destructive" : ""}
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Como podemos ajudar você? (ex.: primeira habilitação, renovação, reciclagem…)"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "border-destructive" : ""}
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full shadow-glow bg-[#25D366] hover:bg-[#20BA5A] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Abrindo WhatsApp…
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5 mr-2" />
              Enviar pelo WhatsApp
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
