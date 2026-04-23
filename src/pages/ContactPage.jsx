import { useState, useRef } from 'react'
import { toast } from 'sonner'
import ConfirmModal from '../components/ConfirmModal.jsx'

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'El nombre es requerido'
  else if (form.name.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres'
  if (!form.email.trim()) errors.email = 'El email es requerido'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Ingresa un email válido'
  if (!form.message.trim()) errors.message = 'El mensaje es requerido'
  else if (form.message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres'
  return errors
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const isValid = Object.keys(validate(form)).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setModalOpen(true)
  }

  const handleConfirm = () => {
    setModalOpen(false)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTouched({})
    toast.success('¡Mensaje enviado! Te responderemos pronto.')
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 bg-[#f9f8f5] dark:bg-[#1c1b19] text-[#28251d] dark:text-[#cdccca] placeholder-[#bab9b4] dark:placeholder-[#5a5957] ${
      touched[field] && errors[field]
        ? 'border-[#a12c7b] dark:border-[#d163a7] focus:ring-[#a12c7b]'
        : 'border-[#dcd9d5] dark:border-[#393836] focus:ring-[#01696f] dark:focus:ring-[#4f98a3]'
    }`

  return (
    <div className="max-w-[640px] mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-xl text-[#28251d] dark:text-[#cdccca]">Contacto</h1>
        <p className="text-sm text-[#7a7974] dark:text-[#797876] mt-1">
          ¿Tienes alguna pregunta o sugerencia? Escríbenos.
        </p>
      </div>

      {submitted && (
        <div role="status" aria-live="polite" className="mb-6 p-4 bg-[#cedcd8] dark:bg-[#313b3b] border border-[#01696f]/20 rounded-lg text-[#0f3638] dark:text-[#4f98a3] text-sm font-medium animate-fade-in-up">
          ✓ ¡Gracias! Tu mensaje fue enviado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Formulario de contacto">
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#28251d] dark:text-[#cdccca] mb-1.5">
            Nombre completo <span aria-hidden="true" className="text-[#a12c7b] dark:text-[#d163a7]">*</span>
          </label>
          <input
            id="name" name="name" type="text" autoComplete="name"
            value={form.name} onChange={handleChange} onBlur={handleBlur}
            aria-required="true" aria-describedby={errors.name && touched.name ? 'error-name' : undefined}
            aria-invalid={!!(errors.name && touched.name)}
            placeholder="Tu nombre"
            className={inputClass('name')}
          />
          {touched.name && errors.name && (
            <p id="error-name" role="alert" className="mt-1.5 text-xs text-[#a12c7b] dark:text-[#d163a7]">{errors.name}</p>
          )}
        </div>

        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#28251d] dark:text-[#cdccca] mb-1.5">
            Correo electrónico <span aria-hidden="true" className="text-[#a12c7b] dark:text-[#d163a7]">*</span>
          </label>
          <input
            id="email" name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} onBlur={handleBlur}
            aria-required="true" aria-describedby={errors.email && touched.email ? 'error-email' : undefined}
            aria-invalid={!!(errors.email && touched.email)}
            placeholder="tu@email.com"
            className={inputClass('email')}
          />
          {touched.email && errors.email && (
            <p id="error-email" role="alert" className="mt-1.5 text-xs text-[#a12c7b] dark:text-[#d163a7]">{errors.email}</p>
          )}
        </div>

        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#28251d] dark:text-[#cdccca] mb-1.5">
            Mensaje <span aria-hidden="true" className="text-[#a12c7b] dark:text-[#d163a7]">*</span>
          </label>
          <textarea
            id="message" name="message" rows={5}
            value={form.message} onChange={handleChange} onBlur={handleBlur}
            aria-required="true" aria-describedby={errors.message && touched.message ? 'error-message' : undefined}
            aria-invalid={!!(errors.message && touched.message)}
            placeholder="Escribe tu mensaje aquí…"
            className={`${inputClass('message')} resize-none`}
          />
          {touched.message && errors.message && (
            <p id="error-message" role="alert" className="mt-1.5 text-xs text-[#a12c7b] dark:text-[#d163a7]">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          aria-disabled={!isValid}
          className="w-full py-3 rounded-lg bg-[#01696f] dark:bg-[#4f98a3] text-white font-medium text-sm hover:bg-[#0c4e54] dark:hover:bg-[#227f8b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#01696f] focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#01696f] dark:disabled:hover:bg-[#4f98a3]"
        >
          Enviar mensaje
        </button>
      </form>

      <ConfirmModal
        open={modalOpen}
        title="¿Enviar mensaje?"
        message={`Se enviará tu mensaje desde "${form.name}" (${form.email}). ¿Confirmas?`}
        confirmLabel="Sí, enviar"
        onConfirm={handleConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  )
}
