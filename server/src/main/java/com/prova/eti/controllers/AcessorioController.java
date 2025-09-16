package com.prova.eti.controllers;


import com.prova.eti.entities.Acessorio;
import com.prova.eti.services.AcessorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acessorio")
public class AcessorioController {

    @Autowired
    private AcessorioService service;

    @GetMapping
    public ResponseEntity<List<Acessorio>> findAll(){
        List<Acessorio> acessorios = service.findAll();
        return ResponseEntity.ok().body(acessorios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Acessorio> findById(@PathVariable Long id) {
        Acessorio acessorio = service.findById(id);
        return ResponseEntity.ok().body(acessorio);
    }

    @PostMapping
    public ResponseEntity<Acessorio> create(@RequestBody Acessorio acessorio){
        service.create(acessorio);
        return ResponseEntity.status(HttpStatus.CREATED).body(acessorio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Acessorio> update(@RequestBody Acessorio acessorio, @PathVariable Long id){
        service.update(id, acessorio);
        return ResponseEntity.ok().body(acessorio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
