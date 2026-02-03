
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  Stethoscope, 
  TrendingUp, 
  Users, 
  Scale, 
  Car, 
  Save,
  ChevronRight,
  Mail
} from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

const INITIAL_CONTACT: ContactInfo = {
  name: "洪薏晴",
  company: "三商美邦人壽",
  title: "RFA 退休理財規劃師",
  slogan: "用專業回應您的信任，用溫度陪伴您的日常。",
  phone: "886917979019", 
  lineId: "t-4cUJ2Op1", 
  instagramId: "ching_1777", 
  email: "ching@example.com"
};

const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: '醫療保險',
    description: '保單檢視 / 理賠服務',
    icon: <Stethoscope size={18} />,
    color: 'bg-blue-500/10 text-blue-400'
  },
  {
    id: '2',
    title: '投資理財',
    description: '資產配置 / 現金流規劃',
    icon: <TrendingUp size={18} />,
    color: 'bg-orange-500/10 text-orange-400'
  },
  {
    id: '3',
    title: '企業團險',
    description: '雇主責任 / 留才計劃',
    icon: <Users size={18} />,
    color: 'bg-purple-500/10 text-purple-400'
  },
  {
    id: '4',
    title: '稅務規劃',
    description: '預留稅源 / 資產傳承',
    icon: <Scale size={18} />,
    color: 'bg-green-500/10 text-green-400'
  },
  {
    id: '5',
    title: '產險服務',
    description: '車險、火險、旅平險',
    icon: <Car size={18} />,
    color: 'bg-red-500/10 text-red-400'
  }
];

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all cursor-pointer group active:scale-[0.98]">
    <div className={`p-2.5 rounded-xl ${item.color} border border-current/10`}>
      {item.icon}
    </div>
    <div className="flex-1">
      <h4 className="text-white font-bold text-sm tracking-wide">{item.title}</h4>
      <p className="text-gray-400 text-[11px] mt-0.5">{item.description}</p>
    </div>
    <ChevronRight size={14} className="text-gray-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
  </div>
);

const App: React.FC = () => {
  const [contact] = useState<ContactInfo>(INITIAL_CONTACT);
  // 加入一個隨機數，確保每次重新進入網頁都會強制抓取最新的圖片檔案
  const [cacheBuster] = useState(() => Date.now());

  const handleSaveContact = () => {
    const formattedPhone = contact.phone.startsWith('886') ? `+${contact.phone}` : contact.phone;
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nORG:${contact.company}\nTITLE:${contact.title}\nTEL;TYPE=CELL:${formattedPhone}\nEMAIL:${contact.email}\nURL:https://line.me/ti/p/${contact.lineId}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name}.vcf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex justify-center items-start sm:py-8">
      <div className="w-full max-w-[420px] bg-[#0c1425] min-h-screen sm:min-h-[820px] sm:rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative border border-white/5">
        
        {/* Header Section */}
        <div className="relative h-[400px] overflow-hidden bg-[#0c1425]">
          <div className="absolute inset-0 hex-pattern opacity-20"></div>
          
          <div className="absolute inset-0 flex items-start justify-center z-10">
            <img 
              src={`./profile.jpg?t=${cacheBuster}`} 
              alt={contact.name} 
              className="h-full w-full object-cover object-top scale-100"
              onError={(e) => {
                // 如果找不到檔案，改為生成女性理財顧問的占位圖
                (e.target as HTMLImageElement).src = "https://api.a0.dev/assets/image?text=Professional%20Asian%20Female%20Financial%20Advisor%20Portrait&aspect=9:16";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425] via-transparent to-transparent opacity-100"></div>
          </div>

          <div className="absolute bottom-10 left-8 z-20 max-w-[220px]">
             <div className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded mb-2 backdrop-blur-sm">
                <span className="text-amber-400 text-[9px] font-black tracking-[0.2em] uppercase">Certified RFA</span>
             </div>
             <h1 className="text-5xl font-black text-white tracking-tighter mb-1 drop-shadow-2xl">
               {contact.name}
             </h1>
             <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-[#0c1425] px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-tight shadow-lg">
                    {contact.company}
                  </span>
               </div>
               <p className="text-gray-300 text-xs font-bold tracking-wide">
                 {contact.title}
               </p>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 flex-1 bg-[#0c1425] relative z-30">
          <div className="pb-8 pt-6">
             <p className="text-gray-400 text-[13px] leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
               "{contact.slogan}"
             </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <a href={`tel:${contact.phone}`} className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-amber-500 rounded-2xl text-[#0c1425] shadow-lg shadow-amber-500/20 group-active:scale-95 transition-all">
                <Phone size={22} strokeWidth={2.5} />
              </div>
              <span className="text-white text-[10px] font-bold opacity-50 uppercase tracking-tighter">電話</span>
            </a>
            <a href={`https://line.me/ti/p/${contact.lineId}`} target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-2xl text-[#06c755] group-active:scale-95 transition-all">
                <MessageCircle size={22} fill="currentColor" />
              </div>
              <span className="text-white text-[10px] font-bold opacity-50 uppercase tracking-tighter">LINE</span>
            </a>
            <a href={`https://www.instagram.com/${contact.instagramId}`} target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-2xl text-[#e4405f] group-active:scale-95 transition-all">
                <Instagram size={22} />
              </div>
              <span className="text-white text-[10px] font-bold opacity-50 uppercase tracking-tighter">IG</span>
            </a>
          </div>

          <div className="space-y-3 pb-32">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-black text-[11px] tracking-[0.2em] uppercase opacity-80">專業服務領域</h3>
               <div className="h-[1px] flex-1 bg-white/5 ml-4"></div>
            </div>
            {SERVICES.map(service => (
              <ServiceCard key={service.id} item={service} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0c1425] via-[#0c1425]/95 to-transparent backdrop-blur-md z-40">
          <button 
            onClick={handleSaveContact}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-[#0c1425] py-4 rounded-2xl font-black text-sm shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all relative overflow-hidden group animate-soft-bounce"
          >
            <div className="absolute inset-0 w-full h-full bg-white/30 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <Save size={18} strokeWidth={3} />
            加入通訊錄
          </button>
          
          <div className="mt-4 flex flex-col items-center opacity-40">
             <div className="flex items-center gap-3">
                <Mail size={12} className="text-white" />
                <span className="text-[9px] text-white font-bold tracking-widest uppercase">
                  Sanshang Meibang Life
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
