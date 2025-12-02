# Configuração Google Tag Manager e Analytics

## 1. Configurar Google Tag Manager (GTM)

### Criar Conta GTM
1. Acesse [Google Tag Manager](https://tagmanager.google.com/)
2. Crie uma conta e container para o site
3. Copie o ID do container (formato: GTM-XXXXXXX)

### Atualizar o Código
No arquivo `index.html`, substitua **GTM-XXXXXXX** pelo seu ID real em 2 lugares:
- Linha 7: no script do <head>
- Linha 79: no <noscript> do <body>

## 2. Configurar Google Analytics 4 (GA4)

### Criar Propriedade GA4
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade GA4
3. Copie o ID de medição (formato: G-XXXXXXXXXX)

### Adicionar GA4 no GTM
1. No GTM, vá em **Tags** > **Nova**
2. Selecione tipo: **Google Analytics: GA4 Configuration**
3. Cole seu ID de medição (G-XXXXXXXXXX)
4. Acionador: **All Pages**
5. Salve e publique

## 3. Configurar Eventos de Conversão

No GTM, os eventos já estão sendo enviados pelo código. Configure as conversões:

### Eventos Implementados
- `conversion` - Evento principal de conversão
- `enrollment_intent` - Intenção de matrícula (Hero CTA)
- `service_request` - Solicitação de serviço específico
- `whatsapp_click` - Cliques no WhatsApp
- `phone_click` - Cliques no telefone
- `view_services` - Visualização da seção de serviços

### Marcar como Conversões no GA4
1. No GA4, vá em **Configurar** > **Eventos**
2. Aguarde os eventos aparecerem (até 24h após tráfego)
3. Marque os eventos importantes como **Conversão**
4. Recomendado: marque `enrollment_intent`, `service_request` e `whatsapp_click`

## 4. Configurar Google Ads (Opcional)

### Vincular GA4 ao Google Ads
1. No GA4: **Administração** > **Vinculações do Google Ads**
2. Conecte sua conta do Google Ads
3. Importe as conversões do GA4 para o Google Ads

### Rastreamento de Conversões
As conversões já rastreadas incluem:
- **Matrícula (Hero)**: Valor 5
- **Solicitação de Serviço**: Valor 3
- **WhatsApp/Telefone**: Valor 1

## 5. Testar a Implementação

### GTM Preview Mode
1. No GTM, clique em **Visualizar**
2. Digite a URL do site
3. Teste todos os CTAs e verifique se os eventos disparam

### GA4 DebugView
1. No GA4, vá em **Configurar** > **DebugView**
2. Navegue no site e veja os eventos em tempo real
3. Confirme que todos os eventos estão sendo registrados

## 6. Publicar

1. Após testar, publique as alterações no GTM
2. Aguarde 24-48h para dados aparecerem no GA4
3. Configure relatórios personalizados conforme necessário

## Suporte Adicional

- [Documentação GTM](https://support.google.com/tagmanager)
- [Documentação GA4](https://support.google.com/analytics)
- [Google Ads Conversions](https://support.google.com/google-ads/answer/6331314)
