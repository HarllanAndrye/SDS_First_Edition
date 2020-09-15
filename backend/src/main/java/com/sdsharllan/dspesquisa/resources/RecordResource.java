package com.sdsharllan.dspesquisa.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdsharllan.dspesquisa.dto.RecordDTO;
import com.sdsharllan.dspesquisa.dto.RecordInsertDTO;
import com.sdsharllan.dspesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records") // End-point (rota principal do recurso)
public class RecordResource {

	@Autowired // utilizado para o spring instanciar o objeto automaticamente
	private RecordService service;
	
	@PostMapping // Informa que será uma requisição POST
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO dto) {
		RecordDTO newDTO = service.insert(dto);
		return ResponseEntity.ok().body(newDTO);
	}
	
}
