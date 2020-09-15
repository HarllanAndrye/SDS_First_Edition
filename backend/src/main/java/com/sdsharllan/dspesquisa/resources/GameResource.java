package com.sdsharllan.dspesquisa.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdsharllan.dspesquisa.dto.GameDTO;
import com.sdsharllan.dspesquisa.services.GameService;

@RestController
@RequestMapping(value = "/games") // End-point (rota principal do recurso)
public class GameResource {
	
	@Autowired // utilizado para o spring instanciar o objeto automaticamente
	private GameService service;
	
	@GetMapping // Informa que será uma requisição GET
	public ResponseEntity<List<GameDTO>> findAll() {
		List<GameDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

}
