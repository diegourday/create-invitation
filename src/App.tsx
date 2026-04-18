import { useRef, useState, type ChangeEvent } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  UserPlus,
  PartyPopper,
  Store,
  User,
  LogOut,
  X,
  Info,
  Star,
  ArrowLeft,
  Copy,
  Circle,
  Link,
  CalendarPlus,
  Users,
  Send,
  Gift,
  MapPin,
  Camera,
  List,
  Save,
  Eye,
  Clock,
  Map,
} from "lucide-react";
import "./App.css";

const EVENT_DATABASE = {
  "20260425603": {
    id: "20260425603",
    title: "Baby shower de Rosa",
    date: "18 de abril de 2026",
    linkDate: "2026-04-18",
    themeBg: "var(--card-top-bg, #FF8C8C)",
    illustration: "https://rumba77.com/illustrations/baby-shower-mujer.svg",
  },
  "20250705123": {
    id: "20250705123",
    title: "Revelación del sexo del bebé de Ernesto Dominguez",
    date: "05 de julio de 2025",
    linkDate: "2025-07-05",
    themeBg: "var(--card-blue)",
    illustration: "https://rumba77.com/illustrations/revelacion-sexo.svg",
  },
  "20260417999": {
    id: "20260417999",
    title: "Revelación del sexo del bebé de Pepe y Norma",
    date: "17 de abril de 2026",
    linkDate: "2026-04-17",
    themeBg: "var(--card-blue)",
    illustration: "https://rumba77.com/illustrations/revelacion-sexo.svg",
  },
} as const;

type PeopleSectionType = "parents" | "godparents";

const PEOPLE_SECTION_CONFIG = {
  parents: { label: "Padres" },
  godparents: { label: "Padrinos" },
} as const;

function PeopleSectionEditor() {
  const [peopleType, setPeopleType] = useState<PeopleSectionType>("parents");
  const [includeParents, setIncludeParents] = useState(true);
  const [includeGodparents, setIncludeGodparents] = useState(true);
  const [fatherName, setFatherName] = useState("José Domínguez");
  const [motherName, setMotherName] = useState("Luna Pérez");
  const [godfatherName, setGodfatherName] = useState("Carlos Mendoza");
  const [godmotherName, setGodmotherName] = useState("María López");

  const includeSection =
    peopleType === "parents" ? includeParents : includeGodparents;
  const setIncludeSection =
    peopleType === "parents" ? setIncludeParents : setIncludeGodparents;

  return (
    <div className="people-section fade-in">
      <h2 className="section-title section-title-people">Padres y Padrinos</h2>

      <div
        className="people-type-switch"
        role="tablist"
        aria-label="Tipo de bloque"
      >
        {(Object.keys(PEOPLE_SECTION_CONFIG) as PeopleSectionType[]).map(
          (type) => (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={peopleType === type}
              className={`people-type-pill ${peopleType === type ? "active" : ""}`}
              onClick={() => setPeopleType(type)}
            >
              {PEOPLE_SECTION_CONFIG[type].label}
            </button>
          ),
        )}
      </div>

      <div className="people-toggle-row">
        <div className="people-section-actions">
          <button
            type="button"
            className={`people-include-pill ${includeSection ? "active" : ""}`}
            onClick={() => setIncludeSection(true)}
          >
            Incluir
          </button>
          <button
            type="button"
            className={`people-include-pill ${!includeSection ? "active" : ""}`}
            onClick={() => setIncludeSection(false)}
          >
            No incluir
          </button>
        </div>
      </div>

      {includeSection ? (
        <div className="people-content-grid">
          <div className="people-form-card">
            <div className="people-fields-grid">
              {peopleType === "parents" ? (
                <>
                  <div className="form-group">
                    <label>Papá</label>
                    <input
                      type="text"
                      className="modern-input"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mamá</label>
                    <input
                      type="text"
                      className="modern-input"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Padrino</label>
                    <input
                      type="text"
                      className="modern-input"
                      value={godfatherName}
                      onChange={(e) => setGodfatherName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Madrina</label>
                    <input
                      type="text"
                      className="modern-input"
                      value={godmotherName}
                      onChange={(e) => setGodmotherName(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="people-empty-state">Sección desactivada.</div>
      )}
    </div>
  );
}

type GalleryPhoto = {
  id: number;
  label: string;
  src: string;
};

function readFileAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });
}

function PhotosSectionEditor() {
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [mainPhotoReady, setMainPhotoReady] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("Nuestra historia");
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const handleDeletePhoto = (id: number) => {
    setGalleryPhotos((current) => current.filter((photo) => photo.id !== id));
  };

  const handleGalleryButtonClick = () => {
    galleryInputRef.current?.click();
  };

  const handleGalleryUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const remaining = 15 - galleryPhotos.length;
    const acceptedFiles = files.slice(0, remaining);
    const currentMaxId =
      galleryPhotos.length > 0
        ? Math.max(...galleryPhotos.map((photo) => photo.id))
        : 0;

    const uploaded = await Promise.all(
      acceptedFiles.map(async (file, index) => ({
        id: currentMaxId + index + 1,
        label:
          file.name.replace(/\.[^.]+$/, "") ||
          `Foto ${currentMaxId + index + 1}`,
        src: await readFileAsDataURL(file),
      })),
    );

    setGalleryPhotos((current) => [...current, ...uploaded]);
    event.target.value = "";
  };

  return (
    <div className="photos-section fade-in">
      <h2 className="section-title section-title-photos">Fotos</h2>

      <div className="photos-summary-bar">
        <div>
          <span className="photos-summary-kicker">
            Galería de la invitación
          </span>
          <h3>Organiza tu foto principal y las fotos del evento</h3>
        </div>
        <div className="photos-counter">{galleryPhotos.length} de 15 fotos</div>
      </div>

      <div className="photos-layout">
        <div className="photos-title-card">
          <div className="photos-card-header">
            <h3>Título de la sección de fotos</h3>
          </div>

          <div className="form-group photos-title-group">
            <input
              type="text"
              className="modern-input"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="photos-main-card">
          <div className="photos-card-header compact">
            <h3>Foto principal</h3>
          </div>

          <div
            className={`photos-upload-hero ${mainPhotoReady ? "ready" : ""}`}
          >
            <div className="photos-upload-icon">
              {mainPhotoReady ? <Eye size={26} /> : <Camera size={26} />}
            </div>
            <div className="photos-upload-copy">
              {!mainPhotoReady && <strong>Agrega tu foto principal</strong>}
              <span>Formatos: JPG, PNG, JFIF o TIFF</span>
              <button
                type="button"
                className="photos-upload-btn"
                onClick={() => setMainPhotoReady(true)}
              >
                <Plus size={16} />{" "}
                {mainPhotoReady ? "Cambiar foto" : "Subir foto"}
              </button>
            </div>
          </div>
        </div>

        <div className="photos-gallery-card">
          <div className="photos-gallery-toolbar">
            <div>
              <h3>Fotos del evento</h3>
              <p>Sube hasta 15 imágenes para la invitación.</p>
            </div>

            <button
              type="button"
              className="photos-add-more-btn"
              onClick={handleGalleryButtonClick}
              disabled={galleryPhotos.length >= 15}
            >
              <Plus size={18} />
              {galleryPhotos.length >= 15
                ? "Límite alcanzado"
                : "Agregar más fotos"}
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="photos-hidden-input"
              onChange={handleGalleryUpload}
            />
          </div>

          {galleryPhotos.length === 0 ? (
            <div className="photos-empty-state">
              <p>Sin fotos aún.</p>
            </div>
          ) : (
            <div className="photos-grid">
              {galleryPhotos.map((photo) => (
                <div className="photo-item" key={photo.id}>
                  <div className="photo-thumb">
                    <img src={photo.src} alt={photo.label} />
                    <span>{photo.label}</span>
                  </div>
                  <div className="photo-item-actions">
                    <button
                      type="button"
                      className="photo-action-btn"
                      onClick={() => setPreviewPhoto(photo.src)}
                    >
                      <Eye size={16} /> Ver
                    </button>
                    <button
                      type="button"
                      className="photo-action-btn danger"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 size={16} /> Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {previewPhoto && (
        <div
          className="modal-overlay photo-preview-modal"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="photo-preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn photo-preview-close"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Cerrar vista previa"
            >
              <X size={24} color="#333" />
            </button>
            <img
              src={previewPhoto}
              alt="Vista previa de foto"
              className="photo-preview-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ItinerarySectionEditor() {
  const [sectionTitle, setSectionTitle] = useState("Itinerario");
  const [activityName, setActivityName] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [activityIcon, setActivityIcon] = useState("dress");
  const [activities, setActivities] = useState<
    { id: number; name: string; time: string; icon: string }[]
  >([]);

  const handleAdd = () => {
    if (!activityName || !activityTime) return;
    setActivities([
      ...activities,
      {
        id: Date.now(),
        name: activityName,
        time: activityTime,
        icon: activityIcon,
      },
    ]);
    setActivityName("");
    setActivityTime("");
  };

  const handleRemove = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  return (
    <div className="itinerary-section fade-in">
      <div className="itinerary-card">
        <div className="form-group">
          <label>
            Título de la sección de itinerario
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            className="modern-input"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
        </div>

        <div className="itinerary-form-area">
          <p className="itinerary-subtitle">
            Agrega las actividades del evento
          </p>

          <div className="form-group">
            <label>Nombre de actividad</label>
            <input
              type="text"
              className="modern-input"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <div className="input-with-icon right">
              <input
                type="time"
                className="modern-input"
                value={activityTime}
                onChange={(e) => setActivityTime(e.target.value)}
              />
              <Clock size={16} className="input-icon" />
            </div>
          </div>

          <div className="form-group">
            <label>Ícono</label>
            <div className="select-wrapper select-icon-wrapper">
              <select
                className="form-select icon-select"
                value={activityIcon}
                onChange={(e) => setActivityIcon(e.target.value)}
              >
                <option value="dress">👗</option>
                <option value="rings">💍</option>
                <option value="party">🎉</option>
                <option value="food">🍽️</option>
                <option value="music">🎵</option>
                <option value="toast">🥂</option>
              </select>
            </div>
          </div>

          <div className="itinerary-actions-center">
            <button
              type="button"
              className="btn-primary itinerary-add-btn"
              onClick={handleAdd}
            >
              Agregar
            </button>
          </div>

          <div className="itinerary-table-container">
            <table className="itinerary-modern-table">
              <thead>
                <tr>
                  <th>Actividad</th>
                  <th>Hora</th>
                  <th>Icono</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-table-cell">
                      No hay registros
                    </td>
                  </tr>
                ) : (
                  activities.map((act) => (
                    <tr key={act.id}>
                      <td>{act.name}</td>
                      <td>{act.time}</td>
                      <td className="icon-cell">
                        {act.icon === "dress" && "👗"}
                        {act.icon === "rings" && "💍"}
                        {act.icon === "party" && "🎉"}
                        {act.icon === "food" && "🍽️"}
                        {act.icon === "music" && "🎵"}
                        {act.icon === "toast" && "🥂"}
                      </td>
                      <td className="action-cell">
                        <button
                          type="button"
                          className="icon-btn danger"
                          onClick={() => handleRemove(act.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event =
    EVENT_DATABASE[eventId as keyof typeof EVENT_DATABASE] ||
    EVENT_DATABASE["20260417999"];

  return (
    <div className="event-details-view">
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={16} /> Volver a mis eventos
      </button>

      <div className="event-hero-banner" style={{ background: event.themeBg }}>
        <div className="hero-content">
          <h1 className="hero-title">{event.title}</h1>
          <div className="hero-link-wrapper">
            <span className="link-label">Link de invitación web:</span>
            <div className="hero-link">
              <div className="link-content">
                <Link size={16} className="link-icon" />
                <a
                  href={`https://rumba77.com/eventos/${event.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://rumba77.com/eventos/{event.id}
                </a>
              </div>
              <button
                className="copy-btn"
                aria-label="Copiar link"
                title="Copiar link"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <span className="hero-date">{event.date}</span>
        </div>
        <div className="hero-illustration">
          <img src={event.illustration} alt={event.title} />
        </div>
      </div>

      <div className="checklist-container">
        <div className="checklist-header">
          <h2>Pasos para finalizar tu invitación</h2>
          <p>Completa estos 4 pasos para que tu evento sea un éxito.</p>

          <div className="progress-bar-container">
            <div className="progress-text">Progreso: 0 de 4 pasos</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "0%" }} />
            </div>
          </div>
        </div>

        <div className="steps-list">
          <div className="step-item">
            <div className="step-icon pending">
              <Circle size={24} />
            </div>
            <div
              className="step-image"
              style={{ color: "var(--primary-purple)" }}
            >
              <CalendarPlus size={36} strokeWidth={1.5} />
            </div>
            <div className="step-content">
              <h3>Ingresar los datos del evento</h3>
              <p>
                Fecha, hora, lugar del evento y si deseas que los invitados
                lleven algún regalo.
              </p>
            </div>
            <div className="step-action">
              <button
                className="btn-secondary"
                onClick={() => navigate(`/mi-evento/${eventId}/editar`)}
              >
                Completar
              </button>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon pending">
              <Circle size={24} />
            </div>
            <div
              className="step-image"
              style={{ color: "var(--primary-purple)" }}
            >
              <Users size={36} strokeWidth={1.5} />
            </div>
            <div className="step-content">
              <h3>Ingresar invitados</h3>
              <p>
                Sube tu lista de invitados en formato excel o ingresa uno por
                uno de forma manual.
              </p>
            </div>
            <div className="step-action">
              <button className="btn-secondary">Completar</button>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon pending">
              <Circle size={24} />
            </div>
            <div
              className="step-image"
              style={{ color: "var(--primary-purple)" }}
            >
              <Send size={36} strokeWidth={1.5} />
            </div>
            <div className="step-content">
              <h3>Mandar las invitaciones</h3>
              <p>
                Te daremos dos opciones, mandarlas por ti o nosotros por nuestro
                sistema.
              </p>
            </div>
            <div className="step-action">
              <button className="btn-secondary">Completar</button>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon pending">
              <Circle size={24} />
            </div>
            <div
              className="step-image"
              style={{ color: "var(--primary-purple)" }}
            >
              <Gift size={36} strokeWidth={1.5} />
            </div>
            <div className="step-content">
              <h3>Sugerencias de obsequios</h3>
              <p>
                Pide a tus invitados qué deseas y donde lo has visualizado tal
                compra.
              </p>
            </div>
            <div className="step-action">
              <button className="btn-secondary">Completar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExtraInfoCard {
  id: number;
  title: string;
  icon: string;
  description: string;
}

function ExtraInformationSectionEditor() {
  const [sectionTitle, setSectionTitle] = useState("Más información");
  const [cards, setCards] = useState<ExtraInfoCard[]>([
    { id: 1, title: 'Mesa de regalos', icon: 'gift', description: 'Liverpool: 12345' },
    { id: 2, title: 'Hospedaje', icon: 'hotel', description: 'Hotel Fiesta Inn' }
  ]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState("gift");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    setCards([...cards, { id: newId, title: newTitle, icon: newIcon, description: newDesc }]);
    setNewTitle("");
    setNewIcon("gift");
    setNewDesc("");
  };

  const handleRemove = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };
  
  const moveCard = (id: number, direction: 'up' | 'down') => {
    const index = cards.findIndex(c => c.id === id);
    if (index < 0) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === cards.length - 1) return;
    
    const newCards = [...cards];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newCards[index], newCards[swapIndex]] = [newCards[swapIndex], newCards[index]];
    setCards(newCards);
  };

  return (
    <div className="extra-section fade-in">
      <h2 className="section-title">Más información</h2>
      
      <div className="modern-form">
        <div className="form-group">
          <label>Título de la sección de información <span className="required">*</span></label>
          <input
            type="text"
            className="modern-input"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="Ej. Información adicional"
          />
        </div>
      </div>

      <div className="itinerary-add-box">
        <h3>Agregar tarjeta de información</h3>
        <div className="itinerary-grid">
          <div className="form-group">
            <label>Título de tarjeta</label>
            <input
              type="text"
              className="modern-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ej. Mesa de regalos"
            />
          </div>
          
          <div className="form-group">
            <label>Icono</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
              >
                <option value="gift">🎁 Regalo</option>
                <option value="hotel">🏨 Hospedaje</option>
                <option value="bus">🚌 Transporte</option>
                <option value="dress">👗 C. de vestimenta</option>
                <option value="music">🎵 Música</option>
                <option value="info">ℹ️ Info</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '16px' }}>
          <label>Descripción</label>
          <textarea
            className="modern-input"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Detalles sobre esta sección..."
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="itinerary-actions-center">
          <button
            type="button"
            className="btn-primary itinerary-add-btn"
            onClick={handleAdd}
          >
            Agregar
          </button>
        </div>
        
        <div className="itinerary-table-container">
          <table className="itinerary-modern-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Icono</th>
                <th>Orden</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cards.length === 0 ? (
                <tr>
                  <td colSpan={4} className="empty-table-cell">
                    No hay registros
                  </td>
                </tr>
              ) : (
                cards.map((card, idx) => (
                  <tr key={card.id}>
                    <td>{card.title}</td>
                    <td className="icon-cell">
                      {card.icon === "gift" && "🎁"}
                      {card.icon === "hotel" && "🏨"}
                      {card.icon === "bus" && "🚌"}
                      {card.icon === "dress" && "👗"}
                      {card.icon === "music" && "🎵"}
                      {card.icon === "info" && "ℹ️"}
                    </td>
                    <td className="action-cell">
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                         <button type="button" className="icon-btn" onClick={() => moveCard(card.id, 'up')} disabled={idx === 0}>⬆️</button>
                         <button type="button" className="icon-btn" onClick={() => moveCard(card.id, 'down')} disabled={idx === cards.length - 1}>⬇️</button>
                      </div>
                    </td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="icon-btn danger"
                        onClick={() => handleRemove(card.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EventEditor() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  const event =
    EVENT_DATABASE[eventId as keyof typeof EVENT_DATABASE] ||
    EVENT_DATABASE["20260417999"];

  const TABS = [
    { id: "general", label: "Datos generales", icon: Info },
    { id: "location", label: "Fecha y lugar", icon: MapPin },
    { id: "people", label: "Padres y Padrinos", icon: Users },
    { id: "photos", label: "Fotos", icon: Camera },
    { id: "itinerary", label: "Itinerario", icon: Clock },
    { id: "extra", label: "Más información", icon: List },
  ] as const;

  return (
    <div className="editor-layout">
      <button
        className="back-btn"
        onClick={() => navigate(`/mi-evento/${eventId}`)}
      >
        <ArrowLeft size={16} /> Volver a los pasos
      </button>

      <div className="editor-header">
        <h1>{event.title}</h1>
        <div className="editor-header-actions">
          <button className="btn-outline">
            <Eye size={18} /> Ver invitación
          </button>
          <button className="btn-filled">
            <Save size={18} /> Guardar
          </button>
        </div>
      </div>

      <div className="editor-body">
        <aside className="editor-sidebar">
          <nav className="tab-list">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="editor-content">
          {activeTab === "general" && (
            <div className="form-section fade-in">
              <h2 className="section-title">Datos generales</h2>
              <div className="modern-form">
                <div className="form-group">
                  <label>
                    Nombre de los padres <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    defaultValue="Ernesto Dominguez"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Título de invitación <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    defaultValue="Te invitamos"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Descripción del evento <span className="required">*</span>
                  </label>
                  <textarea
                    className="modern-textarea"
                    defaultValue="Nos emociona compartir este momento tan especial con ustedes. Únete a nosotros para descubrir juntos si nuestro bebé será un niño o una niña. ¡Será una noche llena de sorpresas, alegría y mucha diversión! 👶😍🎉"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="form-section fade-in">
              <h2 className="section-title">Fecha y lugar</h2>
              <div className="modern-form">
                <div className="form-group">
                  <label>
                    Título de la sección de celebración{" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    defaultValue="Celebración"
                  />
                </div>
                <div className="input-row">
                  <div className="form-group">
                    <label>
                      Fecha del evento <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      className="modern-input"
                      defaultValue="2025-07-05"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Hora del evento <span className="required">*</span>
                    </label>
                    <input
                      type="time"
                      className="modern-input"
                      defaultValue="18:00"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Dirección del evento</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      className="modern-input"
                      defaultValue="Calle Los Olivos"
                    />
                    <MapPin size={18} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Ubicación GPS del evento</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      className="modern-input"
                      placeholder="Buscar en Google Maps..."
                    />
                  </div>
                  <div className="map-placeholder">
                    <Map size={32} color="#D0D0D0" />
                    <span style={{ marginLeft: "12px" }}>
                      Previsualización de Google Maps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "people" && <PeopleSectionEditor />}
          {activeTab === "photos" && <PhotosSectionEditor />}
          {activeTab === "itinerary" && <ItinerarySectionEditor />}

          {activeTab === "extra" && <ExtraInformationSectionEditor />}
        </section>
      </div>
    </div>
  );
}

function Dashboard({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Mis eventos</h1>
        <button
          className="btn-primary new-event-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} strokeWidth={2.5} /> Crear evento
        </button>
      </header>

      <div className="cards-grid">
        <article
          className="event-card"
          style={
            {
              "--card-bg": "#FF8C8C",
              "--card-top-bg": "#FFE2E2",
            } as React.CSSProperties
          }
        >
          <div className="event-card-top">
            <img
              src="https://rumba77.com/illustrations/baby-shower-mujer.svg"
              alt="Baby shower de mujer"
              className="event-illustration"
            />
          </div>

          <div className="event-card-bottom">
            <div className="event-actions">
              <span className="badge">En revisión (?)</span>
              <div className="action-buttons">
                <button className="icon-btn" aria-label="Agregar invitados">
                  <UserPlus size={16} />
                </button>
                <button className="icon-btn" aria-label="Eliminar evento">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="event-info">
              <h2 className="event-title">Baby shower de Rosa</h2>
              <div className="event-meta">
                <span className="event-date">2026-04-18</span>
                <button className="edit-floater" aria-label="Editar evento">
                  <Edit2 size={16} color="#FF8C8C" />
                </button>
              </div>
            </div>

            <button
              className="primary-action-btn"
              onClick={() => navigate("/mi-evento/20260425603")}
            >
              Ver más <ChevronRight size={18} />
            </button>
          </div>
        </article>

        <article className="event-card">
          <div className="event-card-top">
            <img
              src="https://rumba77.com/illustrations/revelacion-sexo.svg"
              alt="Revelación de sexo"
              className="event-illustration"
            />
          </div>

          <div className="event-card-bottom">
            <div className="event-actions">
              <span className="badge">En revisión (?)</span>
              <div className="action-buttons">
                <button className="icon-btn" aria-label="Agregar invitados">
                  <UserPlus size={16} />
                </button>
                <button className="icon-btn" aria-label="Eliminar evento">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="event-info">
              <h2 className="event-title">
                Revelación del sexo del bebé de Ernesto Dominguez
              </h2>
              <div className="event-meta">
                <span className="event-date">2025-07-05</span>
                <button className="edit-floater" aria-label="Editar evento">
                  <Edit2 size={16} color="#6081E6" />
                </button>
              </div>
            </div>

            <button
              className="primary-action-btn"
              onClick={() => navigate("/mi-evento/20250705123")}
            >
              Ver más <ChevronRight size={18} />
            </button>
          </div>
        </article>
      </div>
    </>
  );
}

function MainApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    setIsModalOpen(false);
    navigate("/mi-evento/20260417999");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <img
            src="https://rumba77.com/img/logo.svg"
            alt="Rumba77"
            className="navbar-logo"
            width="140"
          />
          <div className="navbar-links">
            <RouterLink to="/" className="nav-link active">
              <PartyPopper size={18} />
              <span>Mis eventos</span>
            </RouterLink>
            <a href="#" className="nav-link">
              <Store size={18} />
              <span>Tienda</span>
            </a>
            <a href="#" className="nav-link">
              <User size={18} />
              <span>Mi perfil</span>
            </a>
            <a href="#" className="nav-link logout-link">
              <LogOut size={18} />
              <span>Salir</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="layout">
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard setIsModalOpen={setIsModalOpen} />}
            />
            <Route path="/mi-evento/:eventId" element={<EventDetails />} />
            <Route
              path="/mi-evento/:eventId/editar"
              element={<EventEditor />}
            />
          </Routes>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Crear mi evento</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="eventType">Tipo de evento</label>
                <div className="select-wrapper">
                  <select
                    id="eventType"
                    className="form-select"
                    defaultValue="revelacion"
                  >
                    <option value="" disabled>
                      Cumpleaños
                    </option>
                    <option value="" disabled>
                      Boda
                    </option>
                    <option value="revelacion">
                      Revelación del sexo del bebé
                    </option>
                    <option value="" disabled>
                      Baby Shower
                    </option>
                    <option value="" disabled>
                      Graduación
                    </option>
                  </select>
                </div>
              </div>

              <div className="info-box">
                <Info size={18} className="info-icon" />
                <p>
                  Te enviaremos a una ventana en donde podrás completar tu{" "}
                  <strong>invitación</strong> en{" "}
                  <span className="highlight-steps">4 simples pasos</span>.
                </p>
              </div>

              <div className="stars-decoration">
                <Star size={16} className="star star-1" />
                <Star size={12} className="star star-2" />
                <Star size={20} className="star star-3" />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-primary full-width"
                onClick={handleCreateEvent}
              >
                Empezar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
