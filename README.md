# VTracer GUI

Uma interface gráfica moderna e intuitiva para o VTracer, uma ferramenta de vetorização de imagens raster para SVG.

![VTracer GUI Screenshot](https://via.placeholder.com/800x400/0f172a/94a3b8?text=VTracer+GUI)

## 📋 Visão Geral

VTracer GUI transforma imagens raster (JPEG, PNG, BMP, GIF) em gráficos vetoriais SVG de alta qualidade usando o motor VTracer. A aplicação oferece uma interface gráfica limpa com controles intuitivos para ajustar parâmetros de vetorização em tempo real.

### Características Principais

- 🖼️ **Conversão de Imagens**: Suporte para JPEG, PNG, BMP e GIF
- 🎨 **Pré-visualização em Tempo Real**: Compare imagem original e vetorizada lado a lado
- ⚙️ **Controles Avançados**: Ajuste fino de parâmetros de vetorização
- 📐 **Visualização Flexível**: Modos de visualização split, original e vetorial
- 🔍 **Zoom Integrado**: Zoom de 10% a 500% para análise detalhada
- 💻 **Interface Moderna**: Design escuro com Tailwind CSS
- ⚡ **Electron**: Aplicação desktop nativa para Windows, macOS e Linux

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite
- **Estilização**: Tailwind CSS 4
- **Desktop**: Electron 30
- **Ícones**: Lucide React
- **Linguagem**: TypeScript

## 📦 Instalação

### Pré-requisitos

- Node.js 16+ instalado
- VTracer CLI instalado e disponível no PATH

```bash
# Verifique se o VTracer está instalado
vtracer --version
```

### Passos de Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd vtracer-gui
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em desenvolvimento:

```bash
npm run dev
```

4. Para build de produção:

```bash
npm run build
```

## 🎮 Uso

### Iniciar a Aplicação

```bash
npm run dev
```

A aplicação será iniciada em modo de desenvolvimento. Para produção, use:

```bash
# Build da aplicação
npm run build

# Execute o aplicativo Electron
# O executável será gerado em dist-electron/
```

### Fluxo de Trabalho

1. **Carregar Imagem**: Clique na área de drop ou no botão para selecionar uma imagem
2. **Ajustar Parâmetros**: Use a barra lateral para configurar opções de vetorização:
   - **Color Mode**: Selecione entre Color (colorido) ou Binary (binário)
   - **Hierarchical**: Escolha Stacked (empilhado) ou Cutout (recorte)
   - **Curve Fitting**: Selecione Spline, Polygon ou Pixel
   - **Filter Speckle**: Remova pequenos artefatos (0-128 px)
   - **Color Precision**: Controle de precisão de cores (1-8 bits)
   - **Gradient Step**: Definir passos de gradiente (0-255)
   - **Corner Threshold**: Ajuste de detecção de cantos (0-180°)
3. **Converter**: Clique no botão "Convert" para processar
4. **Visualizar**: Compare o resultado com a imagem original
5. **Salvar**: O arquivo SVG será salvo no mesmo diretório da imagem original

## ⚙️ Configurações Detalhadas

### Parâmetros de Vetorização

#### Color Mode
- **Color**: Mantém todas as cores da imagem original
- **Binary**: Converte para preto e branco (2 cores)

#### Hierarchical
- **Stacked**: Cria camadas sobrepostas para diferentes elementos
- **Cutout**: Cria elementos recortados com transparência

#### Curve Fitting
- **Spline**: Curvas suaves e orgânicas (recomendado para fotos)
- **Polygon**: Linhas retas e polígonos
- **Pixel**: Manter estética pixel art

#### Filter Speckle
Remove pequenos pontos e ruídos. Valores maiores removem mais artefatos, mas podem perder detalhes finos.

**Faixa**: 0-128 pixels
**Padrão**: 4 pixels

#### Color Precision
Controla quantos bits usar para cada canal de cor. Menos bits = menos cores = arquivo menor.

**Faixa**: 1-8 bits
**Padrão**: 6 bits

#### Gradient Step
Controla a suavidade de gradientes. Valores menores criam gradientes mais suaves.

**Faixa**: 0-255
**Padrão**: 64

#### Corner Threshold
Ângulo mínimo para detectar cantos. Valores menores detectam mais cantos.

**Faixa**: 0-180 graus
**Padrão**: 60 graus

## 📁 Estrutura do Projeto

```
vtracer-gui/
├── electron/                  # Processo principal do Electron
│   ├── main.ts               # Janela principal e IPC handlers
│   └── preload.ts            # Script de preload para segurança
├── src/                      # Código fonte do React
│   ├── components/           # Componentes React
│   │   ├── Sidebar.tsx       # Barra lateral com controles
│   │   └── Preview.tsx       # Área de pré-visualização
│   ├── styles/               # Estilos CSS
│   │   └── main.css          # Estilos principais + Tailwind
│   ├── App.tsx               # Componente principal
│   └── main.tsx              # Ponto de entrada
├── dist-electron/            # Build do Electron (gerado)
├── dist/                     # Build do frontend (gerado)
├── package.json              # Dependências e scripts
├── vite.config.ts            # Configuração do Vite
├── tailwind.config.js        # Configuração do Tailwind
└── tsconfig.json             # Configuração do TypeScript
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build de produção (frontend + Electron)
npm run build

# Linting do código
npm run lint

# Preview do build
npm run preview
```

## 🛠️ Desenvolvimento

### Configuração do Ambiente

1. Instale o VTracer CLI:
   ```bash
   # Visite: https://github.com/vtracer-rs/vtracer
   # Siga as instruções de instalação para seu SO
   ```

2. Verifique a instalação:
   ```bash
   vtracer --help
   ```

### Arquitetura

A aplicação segue a arquitetura Electron padrão:

- **Main Process** (`electron/main.ts`): Gerencia a janela principal, diálogos de arquivo e execução do VTracer
- **Renderer Process** (`src/`): Interface React que roda no navegador
- **Preload Script** (`electron/preload.ts`):桥梁 segura entre main e renderer

### Comunicação IPC

A comunicação entre processos ocorre via IPC (Inter-Process Communication):

- `select-file`: Abre diálogo de seleção de arquivo
- `run-vtracer`: Executa VTracer com opções especificadas
- `read-file`: Lê arquivo SVG gerado

## 🎨 Customização

### Alterando o Tema

Edite `src/styles/main.css` para modificar as variáveis CSS:

```css
:root {
  --bg-primary: #0f172a;      /* Cor de fundo principal */
  --accent-primary: #3b82f6;  /* Cor de destaque */
  --text-primary: #f8fafc;    /* Cor do texto principal */
  /* ... outras variáveis */
}
```

### Adicionando Presets

Os presets podem ser adicionados no componente `Sidebar.tsx`. Currently disponível: `photo`.

## 📝 Licença

Este projeto está sob a licença [especificar licença].

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas, issues ou sugestões:

- Abra uma issue no GitHub
- Consulte a documentação do [VTracer](https://github.com/vtracer-rs/vtracer)

## 🏗️ Tecnologias e Ferramentas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | ^18.2.0 | Biblioteca de UI |
| TypeScript | ^5.2.2 | Linguagem tipada |
| Electron | ^30.0.1 | Framework desktop |
| Vite | ^5.1.6 | Bundler rápido |
| Tailwind CSS | ^4.1.17 | Framework CSS |
| Lucide React | ^0.554.0 | Biblioteca de ícones |

## 📊 Benchmarks e Performance

- **Tamanho do Bundle**: ~XX MB (após build)
- **Tempo de Build**: ~XX segundos
- **Tempo de Inicialização**: ~XX segundos

*Nota: Valores dependem do sistema e configurações*

## 🔮 Roadmap

- [ ] Salvar configurações personalizadas
- [ ] Exportar como outros formatos vetoriais (AI, EPS)
- [ ] Batch processing (processar múltiplas imagens)
- [ ] Presets salvos pelo usuário
- [ ] Preview de parâmetros em tempo real
- [ ] Plugin para editores de imagem
- [ ] Suporte a imagens animadas (GIF)

## 📸 Screenshots

*TBD: Adicionar screenshots da aplicação*

---

**Desenvolvido com ❤️ usando React + Electron + VTracer**
