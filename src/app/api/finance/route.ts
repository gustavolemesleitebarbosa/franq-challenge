import { FinanceAPIResponse } from "@/types/finance";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const response = await fetch('https://api.hgbrasil.com/finance?key=SUA-CHAVE');

    if (!response.ok) {
      console.error('API Response Error:', {
        status: response.status,
        statusText: response.statusText
      });

      return NextResponse.json(
        {
          error: "Falha na requisição",
          status: response.status,
          statusText: response.statusText
        },
        { status: response.status }
      );
    }

    const data = await response.json() as FinanceAPIResponse;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Detailed API Error:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}