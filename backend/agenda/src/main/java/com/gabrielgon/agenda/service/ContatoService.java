package com.gabrielgon.agenda.service;

import com.gabrielgon.agenda.domain.Contato;
import com.gabrielgon.agenda.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {

    private final ContatoRepository repo;

    public ContatoService(ContatoRepository repo) {
        this.repo = repo;
    }

    public List<Contato> getAll() {
        return repo.findAll();
    }

    public Contato save(Contato contato) {
        return repo.save(contato);
    }

    public List<Contato> saveContatos(List<Contato> contatos) {
        return repo.saveAll(contatos);
    }

    public Optional<Contato> getById(Long id) {
        return repo.findById(id);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public Contato update(Long id, Contato updatedContato) {
        return repo.findById(id).map(contato -> {
            contato.setNome(updatedContato.getNome());
            contato.setTelefone(updatedContato.getTelefone());
            return repo.save(contato);
        }).orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

}
