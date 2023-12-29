<?php
	//***********************************************************************************************
	// AUTOR: Ricardo Erick Rebêlo
	// Objetivo: API de retorno de JSON com o resultado da fórmula de Bhaskara
	// Alterações:
	// 0.1   29/12/2023 - primeira implementação

	header("Content-Type: text/html; charset=UTF-8", true);
	header('Content-Type: application/json');


	$json = file_get_contents('php://input');		// pega o JSON da requisição
	$data = json_decode($json);		// decodifica para objeto
	$float_a = $data->valor_a;
	$float_b = $data->valor_b;
	$float_c = $data->valor_c;

	// mágica
	if( $float_a == 0.0)
	{
		if( $float_b == 0.0)
		{
			$resultado = " x é indefinido";
		} else {
			if( $float_c == 0.0)
			{
				$resultado = "x = 0";
			} else {
				$resultado = "x = " . strval( $float_c / $float_b * -1 ) ?: 0.0;
			}
		}
	} else {
		$delta = pow( $float_b, 2) - ( 4 * $float_a * $float_c);
		if( $delta < 0)
		{
			$resultado = "x é indefinido";
		} else {
			if( $delta == 0 )
			{
				$valor_x = ( $float_b * -1 ) / ( 2 * $float_a) ?: 0.0;
				$resultado = "x = " . strval( $valor_x);
			} else {
				$valor_x1 = ( $float_b * -1 - sqrt( $delta) ) / ( 2 * $float_a) ?: 0.0;
				$valor_x2 = ( $float_b * -1 + sqrt( $delta) ) / ( 2 * $float_a) ?: 0.0;
				$resultado = "x = " . strval( $valor_x1) . " e " . strval( $valor_x2);
			}
		}
	}
	$resultado = str_replace( '.', ',', $resultado);
	echo json_encode($resultado);
?>