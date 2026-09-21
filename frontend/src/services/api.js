
// Production mein Vercel ka URL lega, local mein fallback URL lega
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

/* =========================
   EMI CALCULATOR
   ========================= */
export function calculateEMI(principal, annualRate, tenureYears) {
  const P = Number(principal);
  const R = Number(annualRate);
  const N = Number(tenureYears);

  if (
    !Number.isFinite(P) ||
    !Number.isFinite(R) ||
    !Number.isFinite(N) ||
    P <= 0 ||
    N <= 0
  ) {
    return 0;
  }

  const monthlyRate = R / 12 / 100;
  const months = N * 12;

  if (monthlyRate === 0) {
    return P / months;
  }

  const emi =
    P *
    monthlyRate *
    Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Number.isFinite(emi) ? emi : 0;
}


/* =========================
   API CALL
   ========================= */
export async function callApiEndpoint(endpoint, payload = {}) {

  try {

    console.log('API REQUEST:', endpoint, payload);

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(payload),
      }
    );


    const json = await response.json();

    console.log('API RESPONSE:', endpoint, json);


    if (!response.ok) {

      throw new Error(
        json?.detail
          ? JSON.stringify(json.detail)
          : `API error: ${response.status}`
      );

    }


    return {
      data: json,
      isLiveBackend: true,
    };


  } catch (error) {

    console.error(
      'API ERROR:',
      endpoint,
      error
    );

    throw error;

  }

}
