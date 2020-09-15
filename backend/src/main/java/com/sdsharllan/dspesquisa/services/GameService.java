package com.sdsharllan.dspesquisa.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdsharllan.dspesquisa.dto.GameDTO;
import com.sdsharllan.dspesquisa.entities.Game;
import com.sdsharllan.dspesquisa.repositories.GameRepository;

@Service
public class GameService {
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional(readOnly = true)
	public List<GameDTO> findAll() {
		List<Game> list = gameRepository.findAll();
		
		/*
		 * 1 - Transforma a lista em stream;
		 * 2 - Transforma todos os elementos em GameDTO;
		 * 3 - Tranforma o stream em um lista "Collectors.toList()".
		 * */
		return list.stream().map(x -> new GameDTO(x)).collect(Collectors.toList());
	}

}
