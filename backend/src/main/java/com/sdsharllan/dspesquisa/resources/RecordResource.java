package com.sdsharllan.dspesquisa.resources;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping // Informa que será uma requisição GET
	public ResponseEntity<Page<RecordDTO>> findAll(
			@RequestParam(value = "min", defaultValue = "") String min,
			@RequestParam(value = "max", defaultValue = "") String max,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "0") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "moment") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction
			) {
		
		Instant minDate = "".equals(min) ? null : Instant.parse(min);
		Instant maxDate = "".equals(max) ? null : Instant.parse(max);
		
		// Se igual a 0, retorna todos os registros do BD
		if (linesPerPage == 0) {
			linesPerPage = Integer.MAX_VALUE; // MAX_VALUE: isso garante que irá retornar todos os dados, pois é o maior valor inteiro possível
		}
		
		// Objeto de paginação
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<RecordDTO> list = service.findByMoments(minDate, maxDate, pageRequest);
		return ResponseEntity.ok().body(list);
	}
	
}
