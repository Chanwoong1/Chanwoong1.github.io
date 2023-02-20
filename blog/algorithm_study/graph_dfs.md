---
title: '깊이 우선 탐색'
date: '2022-12-21'
tags: ['algorithm', 'algorithm study', 'python', 'boj', 'graph', 'dfs']
draft: false
summary: 알고리즘 스터디 5주차 - 그래프
layout: PostSimple
---

그래프의 모든 정점을 특정한 순서에 따라 방문하는 알고리즘을 그래프 탐색 알고리즘이라고 한다. 탐색 알고리즘에는 가장 널리 사용되는 방법이 '깊이 우선 탐색'과 '너비 우선 탐색'이 있다. 우선, 깊이 우선 탐색에 대해 알아보고자 한다.

# 깊이 우선 탐색

깊이 우선 탐색(depth-first search, DFS)은 그래프의 모든 정점을 발견하는 가장 단순하고 고전적인 방법이다. 현재 정점과 인접한 간선들을 하나씩 검사하다가, 아직 방문하지 않은 정점으로 향하는 간선이 있다면 그 간선을 따라가는 방법이다. 이 과정을 반복하다 더이상 갈 곳이 없는 정점에 도달하게 된다면, 마지막으로 따라왔던 간선을 따라 되돌아가게 된다.

![Alt text](https://github.com/chanwoong1/chanwoong1.github.io/blob/main/public/static/images/blog_posts/algorithm_study/graph/graph_dfs/00.gif?raw=true)

```python
graph   # 그래프 표현
def dfs(here) : # 깊이 우선 탐색
  print("DFS visits")
  visited[here] = True
  for there in graph[here] :    # 모든 정점 순회
    if (!visited[there]) :    # 아직 방문한 적이 없다면 방문
      dfs(there)
  # 더이상 방문할 정점이 없다면, 재귀 호출을 종료하고 이전 정점으로 돌아간다.

def dfsAll() :  # 모든 정점 방문
  visited = [False] * len(graph)
  for i in range(len(graph)) :  # 모든 정점을 순회하면서 아직 방문한 적이 없다면 방문한다.
    if (!visited[i]) :
      dfs(i)

dfsAll()
```

## 깊이 우선 탐색의 시간 복잡도

깊이 우선 탐색의 시간 복잡도는 어떤 그래프를 사용하느냐의 따라 달라진다.

인접 리스트를 사용하는 경우, 한 정점마다 한 번씩 호출되므로 정확히 N번 호출이 된다. 모든 정점에 대해 dfs를 수행하고 나면 모든 간선을 정확히 한번 혹은 두번 확인함을 알 수 있다. 따라서 인접 리스트를 사용했을 때 깊이 우선 탐색의 시간 복잡도는 정점의 갯수가 N, 간선의 갯수가 E일 경우 O(N + E)의 시간 복잡도를 가진다.

인접 행렬을 사용하는 경우에도 N번 호출이 된다. 하지만 인접 행렬의 경우, dfs 내부에서 다른 모든 정점을 순회하며 두 정점 사이에 간선이 있는지 확인해야하기 때문에 한 번의 실행에 O(N)의 시간이 소요된다. 따라서 전체 시간복잡도는 O(N^2)가 된다.

## 오일러 서킷

dfs를 이용해 풀 수 있는 문제 중 유명한 문제인 오일러 서킷이다. 흔히 '한붓 그리기' 라는 이름으로도 알려져 있다.
