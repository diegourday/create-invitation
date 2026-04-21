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
  Link,
  Calendar,
  Users,
  MapPin,
  Camera,
  List,
  Save,
  Eye,
  Clock,
  Map,
} from "lucide-react";
import { Joyride } from "react-joyride";
import type { Step, EventData } from "react-joyride";
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

type DashboardEventCard = {
  id: string;
  title: string;
  date: string;
  eventPath: string;
  themeBg: string;
  topBg: string;
  illustration: string;
  illustrationAlt: string;
  editColor: string;
};

const INITIAL_DASHBOARD_EVENTS: DashboardEventCard[] = [
  {
    id: "20260425603",
    title: "Baby shower de Rosa",
    date: "18/04/2026",
    eventPath: "/mi-evento/20260425603",
    themeBg: "#FF8C8C",
    topBg: "#FFE2E2",
    illustration: "https://rumba77.com/illustrations/baby-shower-mujer.svg",
    illustrationAlt: "Baby shower de mujer",
    editColor: "#FF8C8C",
  },
  {
    id: "20250705123",
    title: "Revelación del sexo del bebé de Ernesto Dominguez",
    date: "05/07/2025",
    eventPath: "/mi-evento/20250705123",
    themeBg: "var(--card-blue)",
    topBg: "#E9EAFF",
    illustration: "https://rumba77.com/illustrations/revelacion-sexo.svg",
    illustrationAlt: "Revelación de sexo",
    editColor: "#6081E6",
  },
];

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
    <div className="form-section fade-in">
      <h2 className="section-title">Itinerario</h2>

      <div className="modern-form">
        <div className="form-group">
          <label>
            Título de la sección de itinerario
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="modern-input"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
        </div>

        <div className="itinerary-add-box">
          <h3 className="section-subtitle">
            Agrega las actividades del evento
          </h3>

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Joyride state setup
  const [runTour, setRunTour] = useState(true);
  const steps: Step[] = [
    {
      target: ".hero-link-wrapper",
      content:
        "Aquí puedes ir viendo los cambios de tu invitación y compartirla con tus invitados.",
    },
    {
      target: ".tour-completa-datos",
      content: "Ingresa aquí para completar o editar los datos de tu evento, como el lugar, horario e itinerario.",
    },
    {
      target: ".tour-asistencia",
      content: "Aquí podrás visualizar y gestionar las confirmaciones de asistencia de tus invitados.",
    },
    {
      target: ".tour-dedicatorias",
      content: "Revisa y administra los mensajes y dedicatorias especiales que te han enviado.",
    },
    {
      target: ".tour-regalos",
      content: "Organiza tu lista de regalos y sugerencias para tus invitados de forma sencilla.",
    },
  ];

  const event =
    EVENT_DATABASE[eventId as keyof typeof EVENT_DATABASE] ||
    EVENT_DATABASE["20260417999"];

  const handleJoyrideCallback = (data: EventData) => {
    const { status, type, step } = data;

    if (type === "step:before" && step.target) {
      const targetElement = document.querySelector(step.target as string);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (["finished", "skipped"].includes(status)) {
      setRunTour(false);
    }
  };

  return (
    <div className="event-details-view">
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        options={{
          primaryColor: "var(--primary-purple, #6B4EE6)",
          zIndex: 1000,
          showProgress: true,
          buttons: ['back', 'close', 'primary', 'skip'],
          skipBeacon: true,
        }}
        locale={{
          back: "Anterior",
          close: "Cerrar",
          last: "Finalizar",
          next: "Siguiente",
          nextWithProgress: "Siguiente ({current} de {total})",
          skip: "Saltar tour",
        }}
        onEvent={handleJoyrideCallback}
      />
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={16} /> Volver a mis eventos
      </button>

      <div className="event-hero-header">
        <h1 className="hero-title">{event.title}</h1>
        <span className="hero-date">{event.date}</span>
      </div>

      <div
        className="event-hero-banner centered-banner"
        style={{ background: event.themeBg }}
      >
        <div className="hero-content">
          <div className="hero-link-wrapper hero-link-card">
            <div className="hero-link-header">
              <span className="link-label">Link de invitación web:</span>
              <button
                className="btn-info-share"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Info size={14} /> Cómo compartir la invitación
              </button>
            </div>

            <div className="hero-link">
              <div className="link-content">
                <Link size={18} className="link-icon" />
                <a
                  href={`https://rumba77.com/eventos/${event.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-url"
                >
                  https://rumba77.com/eventos/{event.id}
                </a>
              </div>
              <button
                className="copy-btn copy-btn-enhanced"
                aria-label="Copiar link"
                title="Copiar link"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://rumba77.com/eventos/${event.id}`,
                  );
                }}
              >
                <Copy size={16} /> <span className="copy-text">Copiar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content share-modal">
            <div
              className="modal-header"
              style={{
                alignItems: "flex-start",
                paddingBottom: "16px",
                borderBottom: "1px solid #ebebeb",
                marginBottom: "16px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    color: "var(--text-dark)",
                    marginBottom: "4px",
                  }}
                >
                  Cómo compartir la invitación
                </h2>
              </div>
              <button
                className="btn-outline"
                style={{
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  background: "transparent",
                  color: "#666",
                }}
                onClick={() => setIsShareModalOpen(false)}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="modal-body"
              style={{ color: "var(--text-gray)", lineHeight: "1.6" }}
            >
              <ol className="share-steps">
                <li>
                  <strong>Completa tu invitación:</strong> Asegúrate de haber
                  llenado todos los datos, fechas e itinerarios correspondientes
                  a tu evento.
                </li>
                <li>
                  <strong>Copia el enlace:</strong> Usa el botón{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "var(--primary-purple)",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    <Copy size={12} /> Copiar
                  </span>{" "}
                  para obtener el enlace especial de tu invitación ya terminada.
                </li>
                <li>
                  <strong>¡Compártelo!:</strong> Pega este enlace en tus grupos
                  de WhatsApp, Facebook, o correo electrónico con tus invitados.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <div className="main-menu-container">
        <h2 className="main-menu-title">Menú Principal</h2>

        <div className="main-menu-grid">
          <article className="menu-card tour-completa-datos">
            <h3 className="menu-card-title">Completa datos de tu invitación</h3>
            <img
              src="https://rumba77.com/img/png/event-menu/edit_1.svg"
              alt="Completa datos"
              className="menu-card-img"
            />
            <button
              className="menu-card-btn"
              onClick={() => navigate(`/mi-evento/${eventId}/editar`)}
            >
              Ver más <ChevronRight size={18} />
            </button>
          </article>

          <article className="menu-card tour-asistencia">
            <h3 className="menu-card-title">
              Gestiona tu confirmación de asistencia
            </h3>
            <img
              src="https://rumba77.com/img/png/event-menu/attendance_2.svg"
              alt="Confirmación de asistencia"
              className="menu-card-img"
            />
            <button className="menu-card-btn">
              Ver más <ChevronRight size={18} />
            </button>
          </article>

          <article className="menu-card tour-dedicatorias">
            <h3 className="menu-card-title">Gestiona tus dedicatorias</h3>
            <img
              src="https://rumba77.com/img/png/event-menu/letter_1.svg"
              alt="Dedicatorias"
              className="menu-card-img"
            />
            <button className="menu-card-btn">
              Ver más <ChevronRight size={18} />
            </button>
          </article>

          <article className="menu-card tour-regalos">
            <h3 className="menu-card-title">Gestiona tu lista de regalos</h3>
            <img
              src="https://rumba77.com/img/png/event-menu/gift-boxes_1.svg"
              alt="Lista de regalos"
              className="menu-card-img"
            />
            <button className="menu-card-btn">
              Ver más <ChevronRight size={18} />
            </button>
          </article>
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
    {
      id: 1,
      title: "Mesa de regalos",
      icon: "gift",
      description: "Liverpool: 12345",
    },
    {
      id: 2,
      title: "Hospedaje",
      icon: "hotel",
      description: "Hotel Fiesta Inn",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState("gift");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newId =
      cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1;
    setCards([
      ...cards,
      { id: newId, title: newTitle, icon: newIcon, description: newDesc },
    ]);
    setNewTitle("");
    setNewIcon("gift");
    setNewDesc("");
  };

  const handleRemove = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const moveCard = (id: number, direction: "up" | "down") => {
    const index = cards.findIndex((c) => c.id === id);
    if (index < 0) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === cards.length - 1) return;

    const newCards = [...cards];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newCards[index], newCards[swapIndex]] = [
      newCards[swapIndex],
      newCards[index],
    ];
    setCards(newCards);
  };

  return (
    <div className="form-section fade-in">
      <h2 className="section-title">Más información</h2>

      <div className="modern-form">
        <div className="form-group">
          <label>
            Título de la sección de información{" "}
            <span className="required">*</span>
          </label>
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
        <h3 className="section-subtitle">Agregar tarjeta de información</h3>
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

        <div className="form-group" style={{ marginTop: "16px" }}>
          <label>Descripción</label>
          <textarea
            className="modern-input"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Detalles sobre esta sección..."
            rows={3}
            style={{ resize: "vertical" }}
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
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => moveCard(card.id, "up")}
                          disabled={idx === 0}
                        >
                          ⬆️
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => moveCard(card.id, "down")}
                          disabled={idx === cards.length - 1}
                        >
                          ⬇️
                        </button>
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

  const [runTour, setRunTour] = useState(true);

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

  const steps: Step[] = [
    {
      target: ".tour-general",
      content: "Aquí puedes editar los datos principales de tu invitación, como el título y la descripción, que verán tus invitados al ingresar.",
      placement: "bottom",
    },
    {
      target: ".tour-location",
      content: "Ingresa la fecha y especifica el lugar exacto de tu evento para que todos sepan cuándo y dónde asistir.",
      placement: "bottom",
    },
    {
      target: ".tour-people",
      content: "Registra los nombres de los padres y/o padrinos si prefieres que se muestren de forma destacada.",
      placement: "bottom",
    },
    {
      target: ".tour-photos",
      content: "Sube las fotos que quieras compartir en la galería y visualízalas aquí.",
      placement: "bottom",
    },
    {
      target: ".tour-itinerary",
      content: "Crea el cronograma para que tus invitados conozcan cómo estarán organizadas las actividades en tu evento.",
      placement: "bottom",
    },
    {
      target: ".tour-extra",
      content: "Añade notas adicionales que puedan ser de utilidad y la lista de sugerencias o regalos.",
      placement: "bottom",
    },
  ];

  // For horizontal scroll support on steps
  const handleJoyrideCallback = (data: EventData) => {
    const { status, type, step } = data;
    
    // Automatically switch tabs and scroll them into view
    if (type === 'step:before' && step.target) {
      const targetElement = document.querySelector(step.target as string);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    if (["finished", "skipped"].includes(status)) {
      setRunTour(false);
    }
  };

  return (
    <div className="editor-layout">
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        options={{
          primaryColor: "var(--primary-purple, #6B4EE6)",
          zIndex: 1000,
          showProgress: true,
          buttons: ['back', 'close', 'primary', 'skip'],
          skipBeacon: true,
          overlayColor: "rgba(0, 0, 0, 0.5)",
        }}
        locale={{
          back: "Anterior",
          close: "Cerrar",
          last: "Finalizar",
          next: "Siguiente",
          nextWithProgress: "Siguiente ({current} de {total})",
          skip: "Saltar tour",
        }}
        onEvent={handleJoyrideCallback}
      />
      <button
        className="back-btn"
        onClick={() => navigate(`/mi-evento/${eventId}`)}
      >
        <ArrowLeft size={16} /> Volver a los pasos
      </button>

      <div className="editor-header">
        <h1>{event.title}</h1>
        <div className="editor-header-actions">
          <button className="btn-outline" style={{ whiteSpace: "nowrap" }}>
            <Eye size={18} /> Ver invitación
          </button>
          <button className="btn-filled" style={{ whiteSpace: "nowrap" }}>
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
                className={`tab-btn ${activeTab === tab.id ? "active" : ""} tour-${tab.id}`}
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
  const [events, setEvents] = useState(INITIAL_DASHBOARD_EVENTS);

  const handleDeleteEvent = (eventId: string) => {
    setEvents((current) => current.filter((event) => event.id !== eventId));
  };

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
        {events.length > 0 ? (
          events.map((event) => (
            <article
              key={event.id}
              className="event-card"
              style={
                {
                  "--card-bg": event.themeBg,
                  "--card-top-bg": event.topBg,
                } as React.CSSProperties
              }
            >
              <div className="event-card-top">
                <img
                  src={event.illustration}
                  alt={event.illustrationAlt}
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
                    <button
                      className="icon-btn"
                      aria-label="Eliminar evento"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="event-info">
                  <h2 className="event-title">{event.title}</h2>
                  <div className="event-meta">
                    <span className="event-date">{event.date}</span>
                    <button className="edit-floater" aria-label="Editar evento">
                      <Edit2 size={16} color={event.editColor} />
                    </button>
                  </div>
                </div>

                <button
                  className="primary-action-btn"
                  onClick={() => navigate(event.eventPath)}
                >
                  Ver más <ChevronRight size={18} />
                </button>
              </div>
            </article>
          ))
        ) : (
          <button
            type="button"
            className="event-empty-card"
            onClick={() => setIsModalOpen(true)}
            aria-label="Crear evento"
          >
            <div className="event-empty-icon">
              <Plus size={28} />
            </div>
            <h2 className="event-empty-title">Crear evento</h2>
            <p className="event-empty-text">
              Invitación web, lista de regalos y confirmación de asistencia.
            </p>
          </button>
        )}
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
            <div className="modal-header" style={{ alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem" }}>Crear evento</h2>
                <p
                  style={{
                    margin: "6px 0 0 0",
                    fontSize: "0.9rem",
                    color: "var(--text-gray)",
                  }}
                >
                  Invitación web, lista de regalos y confirmación de asistencia
                </p>
              </div>
              <button
                className="btn-outline"
                style={{
                  padding: "6px 12px",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  border: "1px solid #ebebeb",
                }}
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar modal"
              >
                Cerrar <X size={16} />
              </button>
            </div>

            <div className="modal-body" style={{ gap: "20px" }}>
              <div className="form-group">
                <label htmlFor="eventType">
                  Tipo de evento<span className="required-asterisk">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="eventType"
                    className="form-select"
                    defaultValue="revelacion"
                  >
                    <option value="revelacion">
                      Revelación del Sexo del Bebé
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Fecha del evento<span className="required-asterisk">*</span>
                </label>
                <div className="input-with-icon right">
                  <input
                    type="date"
                    className="modern-input"
                    defaultValue="2026-04-17"
                  />
                  <Calendar size={18} className="input-icon" color="#e53935" />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Hora del evento<span className="required-asterisk">*</span>
                </label>
                <div className="input-with-icon right">
                  <input
                    type="time"
                    className="modern-input"
                    defaultValue="17:30"
                  />
                  <Clock size={18} className="input-icon" color="#e53935" />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Nombre de los padres
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="modern-input"
                  placeholder="Pepe y Norma"
                  defaultValue="Pepe y Norma"
                />
              </div>

              <div
                className="info-box"
                style={{
                  background: "#f9f0ff",
                  color: "#a32bce",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Info size={20} color="#a32bce" style={{ flexShrink: 0 }} />
                <p
                  style={{ margin: 0, fontSize: "0.85rem", lineHeight: "1.4" }}
                >
                  Tu invitación web incluye: Confirmación de asistencia y Lista
                  de regalos, listas para usar. Puedes editar o eliminar.
                </p>
              </div>
            </div>

            <div
              className="modal-footer"
              style={{
                borderTop: "none",
                justifyContent: "flex-end",
                paddingTop: "0",
              }}
            >
              <button
                className="btn-primary"
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={handleCreateEvent}
              >
                <Star size={18} /> Crear evento
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
