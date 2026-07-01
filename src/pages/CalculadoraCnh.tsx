import { useMemo, useState } from "react";
import { Calculator, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import SEO from "@/components/SEO";
import CTAButton from "@/components/CTAButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { track } from "@/lib/analytics";
import { addSignal } from "@/lib/leadScore";

type Categoria = "A" | "B" | "AB";
type Pagamento = "avista" | "parcelado_3" | "parcelado_6" | "parcelado_10";

const BASE: Record<Categoria, number> = { A: 1890, B: 2490, AB: 3290 };
const TAXA_DETRAN = 404;
const AULA_EXTRA = 110;
const INCLUSAO_ADD = 1690;

const PAG_MULT: Record<Pagamento, { mult: number; label: string }> = {
  avista: { mult: 0.92, label: "À vista (8% desc.)" },
  parcelado_3: { mult: 1.0, label: "3x sem juros" },
  parcelado_6: { mult: 1.04, label: "6x" },
  parcelado_10: { mult: 1.09, label: "10x" },
};

const CalculadoraCnh = () => {
  const [categoria, setCategoria] = useState<Categoria>("B");
  const [pagamento, setPagamento] = useState<Pagamento>("avista");
  const [aulasExtras, setAulasExtras] = useState(0);
  const [inclusao, setInclusao] = useState(false);

  const total = useMemo(() => {
    const base = inclusao ? INCLUSAO_ADD + BASE.A : BASE[categoria];
    const aulas = aulasExtras * AULA_EXTRA;
    const subtotal = base + aulas + TAXA_DETRAN;
    return Math.round(subtotal * PAG_MULT[pagamento].mult);
  }, [categoria, pagamento, aulasExtras, inclusao]);

  const handleSimulate = () => {
    track("calculadora_simulate", { categoria, pagamento, aulasExtras, inclusao, total });
    addSignal({ type: "category", value: categoria });
  };

  const message = `Olá! Simulei na calculadora:%0A• Categoria: ${categoria}${inclusao ? " (inclusão)" : ""}%0A• Pagamento: ${PAG_MULT[pagamento].label}%0A• Aulas extras: ${aulasExtras}%0A• Estimativa: R$ ${total.toLocaleString("pt-BR")}%0AQuero uma proposta oficial.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Calculadora de CNH em São José dos Pinhais — Simule o valor"
        description="Simule em segundos o valor da sua CNH na Autoescola APTOS: categoria A, B ou AB, aulas extras e formas de pagamento. Receba proposta no WhatsApp."
        canonical="https://autoescolaaptos.com.br/calculadora-cnh"
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Calculadora de CNH</h1>
            <p className="text-lg text-muted-foreground">
              Simulação rápida e transparente. Sem cadastro, sem pegadinha.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md">
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Categoria desejada</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["A", "B", "AB"] as Categoria[]).map((c) => (
                    <Button
                      key={c}
                      variant={categoria === c ? "default" : "outline"}
                      onClick={() => setCategoria(c)}
                      data-intent="select_categoria"
                    >
                      {c}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Forma de pagamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(PAG_MULT) as Pagamento[]).map((p) => (
                    <Button
                      key={p}
                      size="sm"
                      variant={pagamento === p ? "default" : "outline"}
                      onClick={() => setPagamento(p)}
                      data-intent="select_pagamento"
                    >
                      {PAG_MULT[p].label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Aulas práticas extras (R$ {AULA_EXTRA} cada)</Label>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  value={aulasExtras}
                  onChange={(e) => setAulasExtras(Math.max(0, Math.min(30, Number(e.target.value) || 0)))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Resolução 1020/2025: mínimo de 2h. Aulas extras conforme necessidade.
                </p>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inclusao}
                  onChange={(e) => setInclusao(e.target.checked)}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-sm">Adicionar inclusão de categoria (+ R$ {INCLUSAO_ADD})</span>
              </label>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 flex flex-col">
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Estimativa total</p>
              <p className="text-5xl font-bold text-primary mb-4">
                R$ {total.toLocaleString("pt-BR")}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Taxas Detran-PR ({`R$ ${TAXA_DETRAN}`}) inclusas</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Material teórico via app CNH do Brasil</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Sem prazo para concluir (Res. 1020/2025)</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Valores podem variar conforme aprovação</li>
              </ul>
              <div onClick={handleSimulate} className="mt-auto">
                <CTAButton
                  intent="whatsapp-funil"
                  message={message}
                  trackingSource="calculadora_cnh"
                  trackingLabel="solicitar_proposta"
                  fullWidth
                >
                  Solicitar proposta oficial
                </CTAButton>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            * Valores meramente ilustrativos. Confirme com a autoescola a proposta válida do mês.
          </p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};

export default CalculadoraCnh;
