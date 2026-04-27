import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Activity, HeartHandshake, Plus, ArrowLeft, Phone } from 'lucide-react';

const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [view, setView] = useState('list'); // 'list' ou 'create'
  
  // Listagem
  const [abrigos, setAbrigos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [loading, setLoading] = useState(true);

  // Cadastro 
  const [form, setForm] = useState({
    nome: '', 
    estado: '', 
    cidade: '', 
    endereco: '', 
    contato: '',
    capacidade: '',
    ocupacao: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Busca os abrigos na API do back-end
  const fetchAbrigos = () => {
    setLoading(true);
    fetch(`${API_URL}/abrigos`)
      .then(response => response.json())
      .then(data => {
        setAbrigos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do back-end:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAbrigos();
  }, []);

  const handleContatoChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.substring(0, 11);

    if (v.length <= 2) {
      // just digits
    } else if (v.length <= 6) {
      v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
    } else if (v.length <= 10) {
      v = `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
    } else {
      v = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
    }
    
    setForm({ ...form, contato: v });
  };

  // Lógica de Cadastro no Back-end
  const handleCadastrar = (e) => {
    e.preventDefault();

    // Validação extra de Front-end para garantir que nada passe
    if (!form.nome || !form.estado || !form.cidade || !form.endereco || !form.contato || !form.capacidade) {
      alert("Validação: Todos os campos são obrigatórios! Preencha todas as informações.");
      return;
    }

    const contatoRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;
    if (!contatoRegex.test(form.contato)) {
      alert("Validação: O contato deve ser um número de telefone válido com DDD (ex: 11999999999 ou (11) 99999-9999).");
      return;
    }

    const cap = Number(form.capacidade);
    const oc = Number(form.ocupacao);

    if (oc > cap) {
      alert("Validação: O número de pessoas alojadas não pode ser maior do que a capacidade máxima do abrigo!");
      return;
    }

    setSubmitting(true);

    const payload = {
      ...form,
      capacidade: cap,
      ocupacao: oc,
      status: oc >= cap ? 'Lotado' : 'Disponivel'
    };

    fetch(`${API_URL}/abrigos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = errorData.error || 'Erro desconhecido';
        if (errorData.details && Array.isArray(errorData.details)) {
          errorMessage += '\n\nDetalhes:\n- ' + errorData.details.join('\n- ');
        }
        throw new Error(errorMessage);
      }
      return res.json();
    })
    .then(() => {
      setSubmitting(false);
      setForm({nome: '', estado: '', cidade: '', endereco: '', contato: '', capacidade: '', ocupacao: ''});
      setView('list');
      fetchAbrigos(); // Atualiza a lista após o cadastro
    })
    .catch(err => {
      console.error('Erro ao cadastrar:', err);
      alert('Houve um erro ao tentar enviar o formulário. ' + err.message);
      setSubmitting(false);
    });
  };

  const abrigosFiltrados = abrigos.filter((abrigo) => {
    const matchEstado = filtroEstado ? abrigo.estado.toUpperCase() === filtroEstado.toUpperCase() : true;
    const matchCidade = filtroCidade ? abrigo.cidade.toLowerCase().includes(filtroCidade.toLowerCase()) : true;
    return matchEstado && matchCidade;
  });

  return (
    <div className="min-h-screen">
      {/* Header / Hero Section */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-6 py-6 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
                <HeartHandshake size={42} className="text-blue-300" />
                Apoio Enchentes
              </h1>
              <p className="mt-2 text-blue-100 text-lg max-w-xl">
                Encontre abrigos disponíveis ou cadastre novos locais para oferecer suporte.
              </p>
            </div>
            {view === 'list' ? (
              <button 
                onClick={() => setView('create')}
                className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg shadow hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Cadastrar Abrigo
              </button>
            ) : (
              <button 
                onClick={() => setView('list')}
                className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-blue-900 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Voltar aos Abrigos
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        
        {/* VIEW: Formulario de Cadastro */}
        {view === 'create' && (
          <section className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">Cadastrar Novo Abrigo</h2>
            <form onSubmit={handleCadastrar} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Nome do Abrigo <span className="text-red-500">*</span></label>
                <input required type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Ginásio Municipal" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Estado <span className="text-red-500">*</span></label>
                  <select required value={form.estado} onChange={e => setForm({...form, estado: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="">Selecione...</option>
                    {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Cidade <span className="text-red-500">*</span></label>
                  <input required type="text" value={form.cidade} onChange={e => setForm({...form, cidade: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Porto Alegre" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Endereço Completo <span className="text-red-500">*</span></label>
                <input required type="text" value={form.endereco} onChange={e => setForm({...form, endereco: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Rua, Número, Bairro" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Telefone/Contato do Abrigo <span className="text-red-500">*</span></label>
                <input required type="text" maxLength="15" value={form.contato} onChange={handleContatoChange} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: (51) 99999-9999" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Capacidade Total <span className="text-red-500">*</span></label>
                  <input required type="number" min="1" value={form.capacidade} onChange={e => setForm({...form, capacidade: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: 200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Pessoas Já Alojadas <span className="text-red-500">*</span></label>
                  <input required type="number" min="0" value={form.ocupacao} onChange={e => setForm({...form, ocupacao: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: 30" />
                </div>
              </div>

              <button disabled={submitting} type="submit" className="mt-4 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:bg-blue-400">
                {submitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
              </button>
            </form>
          </section>
        )}

        {/* VIEW: Lista de Abrigos */}
        {view === 'list' && (
          <>
            {/* Sessão de Filtro */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-700">
                <Search size={20} />
                Filtre por Localização
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-slate-600 mb-1">Selecione o Estado</label>
                  <select
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={filtroEstado}
                    onChange={(e) => {
                      setFiltroEstado(e.target.value);
                      if (!e.target.value) setFiltroCidade('');
                    }}
                  >
                    <option value="">Todos os Estados</option>
                    {ESTADOS_BR.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className={`text-sm font-semibold mb-1 ${filtroEstado ? 'text-slate-600' : 'text-slate-400'}`}>
                    Cidade
                  </label>
                  <input
                    type="text"
                    disabled={!filtroEstado}
                    placeholder={filtroEstado ? "Digite o nome da cidade..." : "Selecione um estado primeiro..."}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
                    value={filtroCidade}
                    onChange={(e) => setFiltroCidade(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Lista de Abrigos */}
            <section>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                </div>
              ) : abrigosFiltrados.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 text-lg">Nenhum abrigo encontrado nessa região.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {abrigosFiltrados.map((abrigo) => (
                    <div key={abrigo.id} className="bg-white rounded-2xl shadow hover:shadow-md transition-shadow border border-slate-200 overflow-hidden flex flex-col">
                      {/* Card Header Status */}
                      <div className={`px-5 py-3 font-semibold text-sm flex items-center justify-between ${abrigo.status.toLowerCase() === 'disponivel' || abrigo.status.toLowerCase() === 'disponível' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <div className="flex items-center gap-2">
                          <Activity size={16} />
                          {abrigo.status.toUpperCase()}
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-5 flex-1 break-words">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 truncate" title={abrigo.nome}>{abrigo.nome}</h3>
                        
                        <div className="flex items-start gap-2 text-slate-600 mt-4 mb-2">
                          <MapPin size={18} className="mt-0.5 flex-shrink-0 text-slate-400" />
                          <p className="text-sm">
                            <span className="font-bold text-slate-700">{abrigo.cidade} - {abrigo.estado}</span>
                            <br />
                            {abrigo.endereco}
                          </p>
                        </div>

                        {abrigo.contato && (
                          <div className="flex items-center gap-2 text-slate-600 mb-2">
                            <Phone size={18} className="flex-shrink-0 text-slate-400" />
                            <p className="text-sm font-medium">{abrigo.contato}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-slate-600 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <Users size={18} className="text-blue-500 flex-shrink-0" />
                          <div className="text-sm w-full">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold text-slate-700">Ocupação:</span>
                              <span className="font-bold">{abrigo.ocupacao} / {abrigo.capacidade}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                              <div 
                                className={`h-2 rounded-full ${abrigo.ocupacao >= abrigo.capacidade ? 'bg-red-500' : 'bg-blue-500'}`}
                                style={{ width: `${Math.min((abrigo.ocupacao / abrigo.capacidade) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
