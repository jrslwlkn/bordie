package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
)

var session *r.Session

const PAGE_LEN = 20

func main() {
	router := gin.Default()

	var err error
	session, err = r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "bordie",
	})
	if err != nil {
		log.Fatalln(err.Error())
	}

	router.GET("/boards", getBoards)
	router.GET("/board/:boardId/:page", getBoard)
	router.GET("/thread/:threadId", getThread)
	router.GET("/thread/:threadId/post/:postId", getPost)
	router.POST("/post", postPost)

	router.Run("localhost:8088")
}

func getBoards(c *gin.Context) {
	res, err := r.Table("boards").Run(session)
	if err != nil {
		fmt.Println(err.Error())
	}
	var data []interface{}
	err = res.All(&data)
	if err != nil {
		fmt.Println(err.Error())
	}
	c.IndentedJSON(http.StatusOK, data)
}

func getBoard(c *gin.Context) {
	board := c.Params.ByName("boardId")
	// page := c.Params.ByName("page")

	res, err := r.Table("threads").Filter(r.Row.Field("id").Eq(board)).Run(session)
	if err != nil {
		fmt.Println(err.Error())
	}
	var data interface{}
	err = res.One(&data)
	if err != nil {
		fmt.Println(err.Error())
	}
	c.IndentedJSON(http.StatusOK, data)
}

func getThread(c *gin.Context) {

}

func getPost(c *gin.Context) {

}

func postPost(c *gin.Context) {
}
