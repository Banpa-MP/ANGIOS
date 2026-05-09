import frappe
import google.generativeai as genai
import json

@frappe.whitelist()
def consultar_gemini(prompt):
    # AQUI VA TU API KEY REAL
    GOOGLE_API_KEY = "PON_TU_API_KEY_AQUI"
    
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        # Usamos Flash 1.5 por su velocidad extrema en textos medicos
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        response = model.generate_content(prompt)
        return response.text
        
    except Exception as e:
        frappe.log_error(message=str(e), title="Error en Bania IA Gemini")
        return f"Error en el servidor de IA: {str(e)}"
