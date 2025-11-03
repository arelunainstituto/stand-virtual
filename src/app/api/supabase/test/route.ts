import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // Teste básico: listar dados
    const { data, error } = await supabase
      .from('vehicles') // Substitua pelo nome da sua tabela
      .select('*')
      .limit(5);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          hint: 'Certifique-se de que a tabela "vehicles" existe no Supabase',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Conexão com Supabase funcionando!',
      data: data,
      rowCount: data?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
