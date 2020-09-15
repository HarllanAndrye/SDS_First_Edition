package com.sdsharllan.dspesquisa.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdsharllan.dspesquisa.dto.RecordDTO;
import com.sdsharllan.dspesquisa.dto.RecordInsertDTO;
import com.sdsharllan.dspesquisa.entities.Game;
import com.sdsharllan.dspesquisa.entities.Record;
import com.sdsharllan.dspesquisa.repositories.GameRepository;
import com.sdsharllan.dspesquisa.repositories.RecordRepository;

@Service
public class RecordService {
	
	@Autowired
	private RecordRepository recordRepository;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional
	public RecordDTO insert(RecordInsertDTO dto) {
		Record entity = new Record();
		entity.setName(dto.getName());
		entity.setAge(dto.getAge());
		entity.setMoment(Instant.now());
		
		// getOne do (spring data jpa): intancia um objeto monitorado do tipo "Game", mas não vai ao BD. Só salva no BD quando mandar salvar o "Record" 
		Game game = gameRepository.getOne(dto.getGameId());
		entity.setGame(game);
		
		entity = recordRepository.save(entity); // Salvando os dados
		
		return new RecordDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<RecordDTO> findByMoments(Instant minDate, Instant maxDate, PageRequest pageRequest) {
		return recordRepository.findByMoments(minDate, maxDate, pageRequest).map(x -> new RecordDTO(x));
	}

}
